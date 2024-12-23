"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Form from "@/components/ui/form";
import Image from "next/image";
import dp from "../../../public/Images/dp.png";
import PersonalInfo from "./setup/StepNAv/PersonalInfo";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Qualification from "./setup/StepNAv/Qualification";
import Portfolio from "./setup/StepNAv/Portfolio";
import ServiceCharge from "./setup/StepNAv/ServiceCharge";

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

const dataPersonal = [
  {
    label: "Gender",
    error: "Input a valid gender",
    type: "input",
    isImportant: true,
    selection: true,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Date of Birth",
    error: "Input a valid date of Birth",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Postal Code",
    error: "Input a valid postal Code",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Language",
    error: "Input a valid Language",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
];
const dataPortfolio = [
  {
    label: "Select University",
    error: "Select your University",
    type: "input",
    isImportant: false,
    selection: true,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Highest Degree Qualification",
    error: "Select a Highest Degree Qualification",
    type: "input",
    isImportant: false,
    selection: true,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Field of Study",
    error: "Selct a field of study",
    type: "input",
    isImportant: false,
    selection: true,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Start Date",
    error: "Select a valid Start Date",
    type: "input",
    isImportant: false,
    selection: false,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "End Date or Expected End Date",
    error: "Select a valid End Date",
    type: "input",
    isImportant: false,
    selection: false,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Service Category",
    error: "Select a service",
    type: "input",
    isImportant: true,
    selection: true,
    width: "w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]",
  },
  {
    label: "Years of Experience",
    error: "Select a number of years of experience",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[52rem]",
  },
  {
    label: "Upload Your Certifications",
    error: "Upload your certificates",
    type: "file",
    isImportant: true,
    selection: false,
    width: "w-[52rem] py-[1rem]",
  },
  {
    label: "Upload Your Images",
    error: "Upload your images",
    type: "file",
    isImportant: true,
    selection: false,
    width: "w-[52rem] py-[1rem]",
  },
];
const dataService = [
  {
    label: "Rate Per Service",
    error: "Select a Rate Per Service*",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[52rem]",
  },
  {
    label: "Rate Per Hour",
    error: "Select a number of Rate Per Hour*",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[52rem]",
  },
  {
    label: "Bank Name (Select bank you want to use to receive your payment)",
    error: "Select a number of Bank Name",
    type: "input",
    isImportant: true,
    selection: true,
    width: "w-[52rem]",
  },
  {
    label: "Account Number*",
    error: "Select a Account Number*",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[52rem]",
  },
];
const dataVerify = [
  {
    label: "Address Verification",
    error: "Input a valid gender",
    type: "input",
    isImportant: true,
    selection: true,
    width: "w-[52rem]",
  },
  {
    label: "Upload the Document",
    error: "Input a valid date of Birth",
    type: "file",
    isImportant: true,
    selection: false,
    width: "w-[52rem] py-[1rem]",
  },
  {
    label: "ID Type",
    error: "Input a valid postal Code",
    type: "input",
    isImportant: true,
    selection: true,
    width: "w-[52rem]",
  },
  {
    label: "BVN",
    error: "Input a valid Language",
    type: "input",
    isImportant: true,
    selection: false,
    width: "w-[52rem]",
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
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
