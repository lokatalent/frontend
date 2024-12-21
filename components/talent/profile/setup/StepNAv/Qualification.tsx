"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your schema
const schema = z.object({
  university: z.string().nonempty("Please select a university"),
  degree: z.string().nonempty("Enter your degree"),
  field: z.string().nonempty("Pls enter your field of field"),

  startdate: z.string().nonempty("Start date is required"),
  enddate: z.string().nonempty("End date is required"),
  certificate: z.string().nonempty("Upload your certificate"),
});

function Qualification({ setActiveStep }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setActiveStep(2);
    // Additional submit logic here
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="w-full wmax mx-auto p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center items-center gap-12"
          >
            <div className="w-full flex flex-co flex-row flex-wrap justify-center justify-centr items-center gap-12 spce-y-4">
              <TalentDynamicForm
                type="select"
                name="university"
                label="Select University (Optional)"
                control={control}
                options={[
                  { value: "OAU", label: "OAU" },
                  { value: "UI", label: "UI" },
                  { value: "Ibadan", label: "Ibadan" },
                ]}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="select"
                name="degree"
                label="Highest Degree Qualification (Optional)"
                control={control}
                options={[
                  { value: "UI", label: "UI" },
                  { value: "Ibadan", label: "Ibadan" },
                ]}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="select"
                name="field"
                label="Field of Study"
                control={control}
                options={[
                  { value: "Undergraduate", label: "Undergraduate" },
                  { value: "PostGraduate", label: "PostGraduate" },
                ]}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />
              <TalentDynamicForm
                type="date"
                name="startdate"
                label="Start Date"
                control={control}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />

              <TalentDynamicForm
                type="date"
                name="enddate"
                label="End Date or Expected End Date (Optional)"
                control={control}
                className="w-[53rem]"
                required
              />

              <TalentDynamicForm
                type="file"
                name="certificate"
                label="Upload Your Certifications(Optional) "
                control={control}
                required
                className="w-[53rem]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Qualification;
