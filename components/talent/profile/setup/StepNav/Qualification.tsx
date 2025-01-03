"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import { updateEducationProfile } from "@/services/profileService";
import { updateEducationProfileData } from "@/store/talent/profile/TalentProfileSlice";

const fileSchema = z
  .instanceof(File) // Ensure it's a file instance
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must not exceed 5MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    {
      message: "Only JPEG and PNG file types are allowed",
    }
  );

// Define your schema
const schema = z.object({
  university: z.string().optional(),
  degree: z.string().optional(),
  field: z.string().optional(),
  startdate: z.string().optional(),
  enddate: z.string().optional(),
  // certificate: z.array(fileSchema).min(1, "Please upload at least one file"),
});

function Qualification({ setActiveStep }: any) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    console.log(data);
    let temp = {
      institute: data.university,
      discipline: data.field,
      degree: data.degree,
      start: data.startdate,
      finish: data.enddate,
    };
    const response = await updateEducationProfile(temp);
    if (response.status !== 200) {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
      setActiveStep(2);
      return;
    }
    dispatch(
      showToast({
        status: "success",
        message: "Education Profile updated successfully!",
      })
    );
    dispatch(updateEducationProfileData(response.data));

    // Additional submit logic here
  };
  const onError = (data: any) => {
    console.log(data);
    //  setActiveStep(2);
    // Additional submit logic here
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="w-full wmax mx-auto p-6">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
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
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="select"
                name="degree"
                label="Highest Degree Qualification (Optional)"
                control={control}
                options={[
                  { value: "MSE", label: "MSE" },
                  { value: "B.Sc", label: "B.Sc" },
                ]}
                // required for not optional
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="select"
                name="field"
                label="Field of Study"
                control={control}
                options={[
                  { value: "Medicine", label: "Medicine" },
                  { value: "Nursing", label: "PostGraduate" },
                  { value: "Accounting", label: "Accounting" },
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
              />

              <TalentDynamicForm
                type="file"
                name="certificate"
                label="Upload Your Certifications(Optional) "
                control={control}
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
