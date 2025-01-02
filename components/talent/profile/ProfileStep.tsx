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
    title: "Add your Qualifications",
    step: 0,
    status: "undone",
  },
  {
    id: 3,
    title: "Set up your Portfolio",
    step: 0,
    status: "undone",
  },
  {
    id: 4,
    title: "Add your service charge and bank details",
    step: 0,
    status: "completed",
  },
];



export default function ProfileStep() {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };
  console.log(activeStep)

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

          // Apply conditional styling to the label
          labelProps.className =
            index === activeStep && activeStep === 0
              ? "text-red-500" // Add a class for gray text
              : "text-green-500"; // Add a class for

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
                  // const currentStep = activeStep.find((s) => s.id === step.id);
                  return (
                    <button
                      key={step.id}
                      // onClick={() => onStepClick(step.id, "in-progress")}
                      onClick={handleNext}
                      className={cn(
                        "w-full p-4 flex items-center justify-between ",
                        "rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-700 w-[30rem]"
                        // currentStep?.status === "in-progress"
                        //   ? "bg-blue-50 text-primaryBlue"
                        //   : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
            {activeStep === 1 && (
              <Qualification setActiveStep={setActiveStep} />
            )}
            {activeStep === 2 && <Portfolio setActiveStep={setActiveStep} />}
            {activeStep === 3 && (
              <ServiceCharge setActiveStep={setActiveStep} />
            )}

            {/* <p>{activeStep}</p> */}
          </Box>
         
        </React.Fragment>
      )}
    </Box>
  );
}
