"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import { createService, getServiceType } from "@/services/services";
import { capitalize, errorHandler, handleUnauthorizedError } from "@/lib/utils";
import { showToast } from "@/store/auth/toastSlice";
import { setService } from "@/store/talent/service/TalentServiceSlice";
import EditAvailability from "../../editing/EditAvailablity";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootStateAuth } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";

interface Availability {
  [key: string]: {
    isActive: boolean;
    from: string;
    to: string;
  };
}

// Define your schema
const schema = z.object({
  service: z
    .string()
    .nonempty("Please select a service from the list of services"),
  experience: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .transform(Number)
    .refine(
      (val) => val >= 0 && val <= 50,
      "Experience must be between 0 and 50 years"
    ),
  service_rate: z.string().nonempty("Input your service rate per hour"),
  service_desc: z.string().nonempty("Enter your service description"),
  address: z.string().nonempty("Add your address"),
  city: z.string().nonempty("Pls enter your city name"),
  state: z.string().nonempty("Pls enter your city state"),
  country: z.string().nonempty("Please select a country name"),

  // images: z.string().nonempty("Pls upload your images"),
});


function extractCityStateAndCountry(address: string) {
  const parts = address.split(",").map((part) => part.trim()); // Split and trim each part
  const city = parts[parts.length - 3];
  const state = parts[parts.length - 4];
  const country = parts[parts.length - 2];

  if (city && state && country) {
    return `${city}, ${state}, ${country}`;
  } else {
    return "city, state, Nigeria";
  }
}

// Example usage:
const address = "6, Broad street, Lagos,Lagos, Nigeria,";
const result = extractCityStateAndCountry(address);
console.log(result); // Outputs: Lagos, Nigeria

function Portfolio({ setActiveStep }: any) {
  const userAddress = useSelector(
    (state: RootStateAuth) => state.auth.user.address
  );
  const router = useRouter();
  const [error, setError] = useState<string[] | null | string>("");
  

  const initialAvailability = {
    Monday: { isActive: true, from: "09:00", to: "17:00" },
    Tuesday: { isActive: true, from: "09:00", to: "17:00" },
    Wednesday: { isActive: false, from: "", to: "" },
    Thursday: { isActive: true, from: "10:00", to: "16:00" },
    Friday: { isActive: true, from: "09:00", to: "15:00" },
    Saturday: { isActive: false, from: "", to: "" },
    Sunday: { isActive: false, from: "", to: "" },
  };

  // State to manage availability
  const [availability, setAvailability] = useState(initialAvailability);
  const [serviceType, setServiceType] = useState();
  const handleSaveAvailability = (
    updatedAvailability: typeof initialAvailability
  ) => {

    setAvailability(updatedAvailability);
    // Save the updated availability data to the server or elsewhere
  };

  useEffect(() => {
    const ServiceTypeHandler = async () => {
      try {
        const response = await getServiceType();

        const newResponse = response.data.map((type: any) => ({
          value: type.service_type,
          label: capitalize(type.service_type),
        }));
   
        setServiceType(newResponse);
      } catch (error) {

      }
    };
    ServiceTypeHandler();
  }, []);

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {

 ;
    let temp = {
      // id: id,
      // user_id: id,
      experience_years: data.experience,
      service_type: data.service,
      service_desc: data.service_desc,
      rate_per_hour: +data.service_rate,
      availability: {
        monday: {
          start: availability.Monday.from,
          end: availability.Monday.to,
        },
        tuesday: {
          start: availability.Tuesday.from,
          end: availability.Tuesday.to,
        },
        wednesday: {
          start: availability.Wednesday.from,
          end: availability.Wednesday.to,
        },
        thursday: {
          start: availability.Thursday.from,
          end: availability.Thursday.to,
        },
        friday: {
          start: availability.Friday.from,
          end: availability.Friday.to,
        },
        saturday: {
          start: availability.Saturday.from,
          end: availability.Saturday.to,
        },
        sunday: {
          start: availability.Sunday.from,
          end: availability.Sunday.to,
        },
      },
      // address: data.address,
      address: `${data.address}, ${data.city},${data.state}, ${data.country}`,
    };
    const response = await createService(temp);
    if (!response.error) {
      // success

      dispatch(setService(response.data));
      setActiveStep(2);
    } else {
      // error
      handleUnauthorizedError(response, dispatch, router, showToast);
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
    // Additional submit logic here
  };
  const onError = (data: any) => {

    setError(data)
    // setActiveStep(3);
    // Additional submit logic here
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="w-full mx-auto p-6">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full flex flex-col justify-center items-center gap-12"
          >
            <div className="max-w-3xl mx-auto grid grid-cols-2 gap-5">
              <TalentDynamicForm
                type="select"
                name="service"
                label="Service Category"
                control={control}
                options={serviceType}
            
                required
                className=""
              />

              <TalentDynamicForm
                type="number"
                name="experience"
                label="Years of Experience"
                control={control}
                required
                className=""
              />
              <TalentDynamicForm
                type="text"
                name="service_rate"
                label="Service rate per hour"
                control={control}
                required
                className=""
              />

              <TalentDynamicForm
                type="text"
                name="service_desc"
                label="Service Description"
                control={control}
                required
                className=""
              />
              <TalentDynamicForm
                type="select"
                name="country"
                label="Country"
                control={control}
                defaultOption="Nigeria"
                options={[{ value: "Nigeria", label: "Nigeria" }]}
                className=""
                required
              />
              <TalentDynamicForm
                type="text"
                name="city"
                label="City"
                control={control}
                required
                className=""
              />
              <TalentDynamicForm
                type="text"
                name="state"
                label="State"
                control={control}
                required
                className=""
              />
              <TalentDynamicForm
                type="text"
                name="address"
                label="Address"
                control={control}
                required
                className=""
              />

              {/* <TalentDynamicForm
                    type="file"
                    name="images"
                    label="Upload Your Images"
                    control={control}
                    required
                    className="w-[53rem]"
                    
                  /> */}

              {/* <div className="flex-start w-[53rem]">
                <p className="underline">Set Service Radius</p>
              </div> */}
              <div className="flex-start w-[53rem]">
                <EditAvailability
                  trigger={true}
                  initialAvailability={availability}
                  onSave={handleSaveAvailability}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
