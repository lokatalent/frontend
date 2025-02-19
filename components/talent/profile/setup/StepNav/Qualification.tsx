"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler, handleUnauthorizedError, setToken } from "@/lib/utils";
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
import { RootStateAuth, setUser } from "@/store/auth/authSlice";

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
  const userEducationDetails = useSelector((state: any) => state?.talentProfile?.educationProfile);
  const defaultFormValues = {
    university: userEducationDetails?.institute || "",
    degree: userEducationDetails?.degree || "",
    field: userEducationDetails?.discipline || "",
    startdate: userEducationDetails?.start?.split("T")[0] || "",
    enddate: userEducationDetails?.enddate?.split("T")[0] || "",
  };
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    values: defaultFormValues,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const userIsVerified = useSelector(
    (state: RootStateAuth) => state.auth.user.is_verified
  );

  const resetDialog = () => {
    setIsFinished(false);
  };

  const finishedStepHandler = () => {
    router.push("/talent/dashboard/profile");
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
      let data = response.data;
      // save tokens
      setToken(data.tokens.access_token, data.tokens.refresh_token);
      dispatch(setUser(data.user));
    } else {
      // handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const onSubmit = async (data: any) => {
    // console.log(data);
    let temp = {
      institute: data.university,
      discipline: data.field,
      degree: data.degree,
      start: data.startdate,
      finish: data.enddate,
    };

    if (
      (temp.institute === defaultFormValues.university) &&
      (temp.degree === defaultFormValues.degree) &&
      (temp.discipline === defaultFormValues.field) &&
      (temp.start === defaultFormValues.startdate) &&
      (temp.finish === defaultFormValues.enddate)
    ){
      setIsFinished(true);
      return;
    }
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

  const skipStep = () => {
    handleSkip();
    setIsFinished(true);
  };

  const onError = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-full flex flex-col justify-center items-center gap-8"
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
            />
            <TalentDynamicForm
              type="date"
              name="startdate"
              label="Start Date"
              control={control}
              className="w-full"
            />
            <TalentDynamicForm
              type="date"
              name="enddate"
              label="End Date or Expected End Date "
              control={control}
              className="w-full"
            />
            <TalentDynamicForm
              type="file"
              name="certificate"
              label="Upload Your Certifications"
              control={control}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button variant="outline" onClick={skipStep} className="h-14 w-full sm:w-auto">
              Skip this step
            </Button>
            <button
              type="submit"
              className="text-sm text-white bg-[#3377FF] font-normal leading-6 w-full sm:w-[15rem] lg:w-[20rem] rounded h-14 transition hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Dialog open={isFinished} onOpenChange={resetDialog}>
        <DialogContent
          className="w-full p-6 sm:max-w-lg lg:max-w-md"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center">Changes Saved</DialogTitle>
          </DialogHeader>
          <div className="w-full space-y-4 text-center">
            <IoIosSend color="#3377FF" size={50} />
            <p>Your profile setup is complete! You can now start accepting bookings.</p>
          </div>
          <div className="text-center mt-4">
            <DialogClose>
              <Button
                type="button"
                className="w-full sm:w-auto px-10 py-4"
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
