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
import dp from "../../../public/Images/dp.png"

const steps = [
  "Personal Information",
  "Portfolio",
  "Service Charge",
  "Verification",
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

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
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          console.log(stepProps, labelProps);
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box>
            {activeStep === 0 && (
                <Form isFormValid={true} dataInput={dataPersonal} >{null}</Form>
            )}
            {activeStep === 1 && (
              <Form isFormValid={true} dataInput={dataPortfolio}>
                <div className="flex items-center justify-between space-x-6">
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white">
                    <Image
                      src={dp}
                      alt="My Profile Photo"
                      className="" // w-10 h-10 --for empty dp
                    />
                  </div>
                  <div>
                    <button className="text-sm text-[#fff] bg-primaryBlue px-8 py-1 rounded">
                      Add Profile Image
                    </button>
                  </div>
                </div>
              </Form>
            )}
            {activeStep === 2 && (
                <Form isFormValid={true} dataInput={dataService}>{null}</Form> 
            )}
            {activeStep === 3 && (
                <Form isFormValid={true} dataInput={dataVerify}>{null}</Form>
            )}

            {/* <p>{activeStep}</p> */}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            <Button
              onClick={handleNext}
              className="font-nunito contactButton text-xl text-[#fff] bg-primaryBlue hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
