"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your schema
const schema = z.object({
  gender: z.string().nonempty("Please select a Gender"),
  address: z.string().nonempty("Enter your address"),
  city: z.string().nonempty("Pls enter your city name"),
  country: z.string().nonempty("Please select a country name"),
  dateofbirth: z.string().nonempty("Start date is required"),
});

function PersonalInfo({ setActiveStep }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setActiveStep(1);
    // Additional submit logic here
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="w-full wmax mx-auto p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-12"
          >
            <div className="w-full flex flex-co flex-row flex-wrap justify-center justify-centr items-center gap-12 spce-y-4">
              <TalentDynamicForm
                type="select"
                name="gender"
                label="Gender"
                control={control}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="date"
                name="dateofbirth"
                label="Date of Birth"
                control={control}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />
              <TalentDynamicForm
                type="select"
                name="country"
                label="Country"
                control={control}
                options={[
                  { value: "Nigeria", label: "Nigeria" },
                  { value: "Ghana", label: "Ghana" },
                  { value: "India", label: "India" },
                ]}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />
              <TalentDynamicForm
                type="text"
                name="city"
                label="City"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="text"
                name="address"
                label="Address"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
