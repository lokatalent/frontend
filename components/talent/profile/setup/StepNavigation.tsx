"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
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

interface activeStep {
  step: 0 | 1 | 2 | 3 | 4;
  id: 4;
  title: "Add your service charge and bank details";
  status: "undone" | "doing" | "done";
}

const StepNavigation = ({ stepNavHandler, activeSteps, onStepClick }) => {
  //   ${activeStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-8 px-4">
        {steps.map((step, index) => {
          const currentStep = activeSteps.find((s) => s.id === step.id);
          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "transition-colors duration-200",
                  currentStep?.status === "in-progress"
                    ? "border-2 border-primaryBlue text-primaryBlue bg-white"
                    : currentStep?.status === "completed"
                    ? "bg-primaryBlue text-white"
                    : "bg-red-200 text-gray-600"
                )}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2 border-t-2 border-dashed",
                    currentStep?.status !== "undone"
                      ? "border-primaryBlue"
                      : "border-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* // for step active step list */}
      {/* ${
            activeStep === step.id
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          } */}

      {/* Step list */}
      {/* {activeStep.step === 0 && ( */}
      <div className="space-y-4">
        {steps.map((step) => {
          const currentStep = activeSteps.find((s) => s.id === step.id);
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id, "in-progress")}
              className={cn(
                "w-full p-4 flex items-center justify-between",
                "rounded-lg transition-colors duration-200",
                currentStep?.status === "in-progress"
                  ? "bg-blue-50 text-primaryBlue"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}
            >
              <span className="text-sm font-medium">{step.title}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          );
        })}
      </div>
      {/* )} */}
    </div>
  );
};

export default StepNavigation;
