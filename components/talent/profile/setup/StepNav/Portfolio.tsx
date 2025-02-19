"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import { createService, getServiceType } from "@/services/services";
import { capitalize, errorHandler, handleUnauthorizedError, compareAvailability } from "@/lib/utils";
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

function Portfolio({ setActiveStep }: any) {
  const userAddress = useSelector(
    (state: RootStateAuth) => state.auth.user.address
  );
  const userLatestService = useSelector((state: any) => state.service.service);
  const router = useRouter();
  const [error, setError] = useState<string[] | null | string>("");
  const initialAvailability = {
    Monday: {
      isActive: userLatestService?.availability?.monday?.start && userLatestService?.availability?.monday.end ? true : false,
      from: userLatestService?.availability?.monday.start || "09:00",
      to: userLatestService?.availability?.monday.end || "17:00",
    },
    Tuesday: {
      isActive: userLatestService?.availability?.tuesday.start && userLatestService?.availability?.tuesday.end ? true : false,
      from: userLatestService?.availability?.tuesday.start || "09:00",
      to: userLatestService?.availability?.tuesday.end || "17:00",
    },
    Wednesday: {
      isActive: userLatestService?.availability?.wednesday.start && userLatestService?.availability?.wednesday.end ? true : false,
      from: userLatestService?.availability?.wednesday.start || "09:00",
      to: userLatestService?.availability?.wednesday.end || "17:00",
    },
    Thursday: {
      isActive: userLatestService?.availability?.thursday.start && userLatestService?.availability?.thursday.end ? true : false,
      from: userLatestService?.availability?.thursday.start || "09:00",
      to: userLatestService?.availability?.thursday.end || "17:00",
    },
    Friday: {
      isActive: userLatestService?.availability?.friday.start && userLatestService?.availability?.friday.end ? true : false,
      from: userLatestService?.availability?.friday.start || "09:00",
      to: userLatestService?.availability?.friday.end || "17:00",
    },
    Saturday: {
      isActive: userLatestService?.availability?.saturday.start && userLatestService?.availability?.saturday.end ? true : false,
      from: userLatestService?.availability?.saturday.start || "09:00",
      to: userLatestService?.availability?.saturday.end || "17:00",
    },
    Sunday: {
      isActive: userLatestService?.availability?.sunday.start && userLatestService?.availability?.sunday.end ? true : false,
      from: userLatestService?.availability?.sunday.start || "09:00",
      to: userLatestService?.availability?.sunday.end || "17:00",
    },
  };
  const defaultFormValues = {
    service: userLatestService?.service_type || "",
    experience: `${userLatestService?.experience_years}` || "",
    service_rate: `${userLatestService?.rate_per_hour}` || "",
    service_desc: userLatestService?.service_desc || "",
    address: userLatestService?.address.split(",")?.slice(0, -3)?.join(", ") || "",
    city: userLatestService?.address?.split(",")?.at(-3) || "",
    state: userLatestService?.address?.split(",")?.at(-2),
    country: "Nigeria",
  }

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
    values: defaultFormValues,
  });

  const onSubmit = async (data: any) => {
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
      address: `${data.address}, ${data.city}, ${data.state}, ${data.country}`,
    };

    if (
      (`${temp.experience_years}` === defaultFormValues.experience) &&
      (temp.service_type === defaultFormValues.service) &&
      (temp.service_desc === defaultFormValues.service_desc) &&
      (`${temp.rate_per_hour}` === defaultFormValues.service_rate) &&
      (temp.address === `${defaultFormValues.address}, ${defaultFormValues.city}, ${defaultFormValues.state}, ${defaultFormValues.country}`) &&
      compareAvailability(availability, initialAvailability)
    ) {
      setActiveStep(2);
      return;
    }
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
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-w-4xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TalentDynamicForm
              type="select"
              name="service"
              label="Service Category"
              control={control}
              options={serviceType}
              required
              className="w-full overflow-y-auto"
            />
            <TalentDynamicForm
              type="number"
              name="experience"
              label="Years of Experience"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="service_rate"
              label="Service rate per hour"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="service_desc"
              label="Service Description"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="select"
              name="country"
              label="Country"
              control={control}
              defaultOption="Nigeria"
              options={[{ value: "Nigeria", label: "Nigeria" }]}
              className="w-full"
              required
            />
            <TalentDynamicForm
              type="text"
              name="city"
              label="City"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="state"
              label="State"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="address"
              label="Street Address"
              control={control}
              required
              className="w-full"
            />
          </div>
          <div className="flex-justify-center w-full">
            <EditAvailability
              trigger={true}
              initialAvailability={availability}
              onSave={handleSaveAvailability}
            />
          </div>
          <div className="flex flex-justify-center">
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
  );
}

export default Portfolio;
