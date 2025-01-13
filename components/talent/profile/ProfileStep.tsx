"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import PersonalInfo from "./setup/StepNav/PersonalInfo";
import Qualification from "./setup/StepNav/Qualification";
import Portfolio from "./setup/StepNav/Portfolio";
import ServiceCharge from "./setup/StepNav/ServiceCharge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoIosSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import { RootStateAuth } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "@/services/authService";
import { showToast } from "@/store/auth/toastSlice";

const steps = [
  "Personal Information",
  "Portfolio",
  "Service Charge",
  "Verification",
];

const steps1 = [
  {
    id: 1,
    title: "Add your personal information",
    step: 0,
    status: "undone",
  },
  {
    id: 2,
    title: "Set up your Portfolio",
    step: 0,
    status: "undone",
  },
  {
    id: 3,
    title: "Add your bank details",
    step: 0,
    status: "completed",
  },
  {
    id: 4,
    title: "Add your Qualifications",
    step: 0,
    status: "undone",
  },
];

export default function ProfileStep() {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [isFinished, setIsFinished] = React.useState(false);
  const router = useRouter();
  const userIsVerified = useSelector(
    (state: RootStateAuth) => state.auth.user.is_verified
  );
  const dispatch = useDispatch();

  // console.log(activeStep);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const resetDialog = () => {
    setIsFinished(false);
  };

  const finishedStepHandler = () => {
    router.push("/talent/dashboard/profile");
  };
  
  
  const onVerifyUser = async () => {
    const response = await verifyUser();
    console.log(response);
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Your account has been verified successfully",
        })
      );
    } else {
      dispatch(
        showToast({
          status: "error",
          message: response.data.message,
        })
      );
    }
  };
  
  const handleSkip = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (!userIsVerified) onVerifyUser();
    setIsFinished(true);
    // Add the current step to skipped steps
    const newSkipped = new Set(skipped);
    newSkipped.add(activeStep);
    setSkipped(newSkipped);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stepper activeStep={activeStep} className="w-[44rem]">
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode; className?: string } =
            {};

          labelProps.className =
            index === activeStep && activeStep === 0
              ? "text-red-500"
              : "text-green-500";

          return (
            <Step key={label} {...stepProps} className="my-10">
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box>
            {activeStep === -1 && (
              <div className="space-y-4">
                {steps1.map((step) => {
                  return (
                    <button
                      key={step.id}
                      onClick={handleNext}
                      className={cn(
                        "w-full p-4 flex items-center justify-between ",
                        "rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-700 w-[30rem]"
                      )}
                    >
                      <span className="text-sm font-medium">{step.title}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            )}
            {activeStep === 0 && <PersonalInfo setActiveStep={setActiveStep} />}
            {activeStep === 1 && <Portfolio setActiveStep={setActiveStep} />}
            {activeStep === 2 && (
              <ServiceCharge setActiveStep={setActiveStep} />
            )}
            {activeStep === 3 && (
              <div className="space-y-4">
                <Qualification
                  setActiveStep={setActiveStep}
                  handleSkip={handleSkip}
                />

                <Dialog open={isFinished} onOpenChange={resetDialog}>
                  <DialogContent
                    className="w-full p-[3rem] sm:max-w-lg lg:max-w-[25rem]"
                    aria-describedby={undefined}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Changes Saved
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full space-y-3">
                      <div className="w-full text-center mt-2 flex-center">
                        <IoIosSend color="#3377FF" size={50} />
                      </div>
                      <p className="w-full text-center flex-center">
                      Your profile setup is complete! You can now start accepting bookings
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
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
