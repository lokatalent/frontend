"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler, handleUnauthorizedError } from "@/lib/utils";
import { updateEducationProfile } from "@/services/profileService";
import { updateEducationProfileData } from "@/store/talent/profile/TalentProfileSlice";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import { verifyUser } from "@/services/authService";
import { RootStateAuth } from "@/store/auth/authSlice";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must not exceed 5MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    {
      message: "Only JPEG and PNG file types are allowed",
    }
  );

const schema = z.object({
  university: z.string().nonempty("Enter your university"),
  degree: z.string().nonempty("Select a degree"),
  field: z.string().nonempty("Enter your field of study"),
  startdate: z.string().nonempty("Enter your start date"),
  enddate: z.string().optional(),
});

function Qualification({ setActiveStep, handleSkip }: any) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const userIsVerified = useSelector((state: RootStateAuth) => state.auth.user.is_verified)

  const resetDialog = () => {
    setIsFinished(false);
  };

  const finishedStepHandler = () => {
    router.push("/dashboard/profile");
  };

  const onVerifyUser = async () => {
      const response = await verifyUser();
      if (!response.error) {
        dispatch(
          showToast({
            status: "success",
            message: "Your account has been verified successfully",
          })
        );
      } else {
                handleUnauthorizedError(response, dispatch, router, showToast);
        
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
      }
    };

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
    if (!response.error) {
      // success
      dispatch(
        showToast({
          status: "success",
          message: "Education Profile updated successfully!",
        })
      );
      dispatch(updateEducationProfileData(response.data));
    } else {
      // error
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
      // throw new Error(response.data.message);
    }

    if (!userIsVerified) onVerifyUser();
    setIsFinished(true);
  };

  const onError = (data: any) => {
    console.log(data);
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
                label="Select University "
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
                label="Highest Degree Qualification"
                control={control}
                options={[
                  { value: "MSE", label: "MSE" },
                  { value: "B.Sc", label: "B.Sc" },
                ]}
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
               
              />
              <TalentDynamicForm
                type="date"
                name="startdate"
                label="Start Date"
                control={control}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
               
              />
              <TalentDynamicForm
                type="date"
                name="enddate"
                label="End Date or Expected End Date "
                control={control}
                className="w-[53rem]"
               
              />
              <TalentDynamicForm
                type="file"
                name="certificate"
                label="Upload Your Certifications"
                control={control}
                className="w-[53rem]"
                
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-6">
              <Button variant="outline" onClick={handleSkip} className="mt-4">
                Skip this step
              </Button>
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

      <Dialog open={isFinished} onOpenChange={resetDialog}>
        <DialogContent
          className="w-full p-[3rem] sm:max-w-lg lg:max-w-[25rem]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Changes Saved</DialogTitle>
          </DialogHeader>
          <div className="w-full space-y-3">
            <div className="w-full text-center mt-2 flex-center">
              <IoIosSend color="#3377FF" size={50} />
            </div>
            <p className="w-full text-center flex-center">
              Your profile is complete! You can now proceed to verify your
              address and ID in the settings to start accepting bookings
            </p>
          </div>
          <div className="text-center mt-4">
            <DialogClose>
              <Button
                type="button"
                className="px-24 py-6 flex-center"
                onClick={finishedStepHandler}
              >
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Qualification;
