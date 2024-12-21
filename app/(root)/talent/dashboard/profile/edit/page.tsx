"use client";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldConfig, profileFormSchema } from "@/lib/utils";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { setProfilePics } from "@/store/profile/profileSlice";
import { useDispatch } from "react-redux";
import StepNavigation from "@/components/talent/profile/setup/StepNavigation";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileStep from "@/components/talent/profile/ProfileStep";

// Define your schema
const schema = z.object({
  gender: z.string().nonempty("Please select a Gender"),
  address: z.string().nonempty("Enter your address"),
  city: z.string().nonempty("Pls enter your city name"),
  country: z.string().nonempty("Please select a country name"),
  dateofbirth: z.string().nonempty("Start date is required"),
});

const fields: FieldConfig[] = [
  {
    name: "gender",
    type: "select",
    label: "Gender*",
    options: ["Male", "Female"],
    validation: {
      required: "Select a gender",
    },
  },
  {
    name: "dateofBirth",
    type: "date",
    label: "Date of Birth*",
    validation: {
      required: "Date of Birth is required",
      minLength: {
        value: 1,
        message: "Date of Birth must be at least 6 characters",
      },
    },
  },
  {
    name: "country",
    type: "select",
    label: "Country*",
    options: ["Nigeria", "India", "Senegal", "Australia"],
    validation: {
      required: "Select a country",
      //  validate: (value: string) =>
      //    ["Nigeria", "India", "Senegal", "Australia"].includes(value) ||
      //    "You must select a valid country",
    },
  },
  // {
  //   name: "state",
  //   type: "text",
  //   label: "State*",
  //   validation: {
  //     required: "Select a State",
  //     minLength: {
  //       value: 6,
  //       message: "State must be at least 3 characters",
  //     },
  //   },
  // },
  {
    name: "city",
    type: "text",
    label: "City*",
    validation: {
      required: "Select a City",
      minLength: {
        value: 6,
        message: "City must be at least 3 characters",
      },
    },
  },
  {
    name: "address",
    type: "text",
    label: "Address*",
    validation: {
      required: "Address is required",
      minLength: {
        value: 6,
        message: "Address must be at least 6 characters",
      },
    },
  },
];
type Step = {
  id: number;
  step: number;
  status: "undone" | "in-progress" | "completed";
};

type StepNavProps = {
  stepNavHandler: (stepStatus: string) => void;
  activeSteps: Step[];
  onStepClick: (id: number) => void;
};

const schemaType = profileFormSchema;

function Edit() {
  //   const [activeStep, setActiveStep] = useState<Step[]>([
  //     { id: 1, step: 0, status: "undone" },
  //     { id: 2, step: 0, status: "undone" },
  //     { id: 3, step: 0, status: "undone" },
  //     { id: 4, step: 0, status: "undone" },
  //   ]);
  //   const [newStep, setNewStep] = useState( {
  //     "0": {
  //         status: 'default',
  //     },
  //     "1": {
  //         status: 'undone',
  //     },
  //     "2": {
  //         status: 'undone',
  //     },
  //     "3": {
  //         status: 'undone',
  //     },
  //     "4": {
  //         status: 'undone',
  //     }
  // })
  //   const stepss =

  //      const stepFunction = (id: number, sta: string) => {
  //        setActiveStep((prevSteps) =>
  //          prevSteps.map((step) => {
  //            if (step.id === id) {
  //              // Update the step and status for the matching ID
  //              return {
  //                ...step,
  //                step: step.step + 1, // Increment the step
  //                status: step.step + 1 >= 1 ? "in-progress" : step.status, // Update status if step >= 1
  //              };
  //            }
  //            return step; // No change for non-matching IDs
  //          })
  //        );
  //   };

  //   const [stepNav, setStepNav] = useState<string>("");

  //   const stepFunction = (id: number) => {
  //     setActiveStep((prevSteps) =>
  //       prevSteps.map((step) => {
  //         if (step.id === id) {
  //           const newStep = step.step + 1;
  //           return {
  //             ...step,
  //             step: newStep,
  //             status: "in-progress",
  //             // status: newStep >= 1 ? "in-progress" : step.status,
  //           };
  //         }
  //         return step;
  //       })
  //     );
  //     console.log(activeStep)
  //   };
  //     console.log(activeStep);

  //   const stepNavHandler = (stepStatus: string) => {
  //     setStepNav(stepStatus);
  //   };

  //   const onSubmit = (data: any) => {
  //     console.log(data);
  //     // Additional submit logic here
  //   };

  const dispatch = useDispatch();
  const router = useRouter();
  // const [stepNav, setStepNav] = useState();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const [selectedImage, setSelectedImage] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl: string = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Make sure setSelectedImage is defined in your component
      dispatch(setProfilePics(imageUrl));
    }
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="">
      <section className="bg-primaryBg bg-red relative">
        <div className="self-start cursor-pointer absolute top-[10%] sm:top-[1%] md:top-[1%] lg:top-[10%] left-[3%] h-12 w-12">
          <div onClick={() => router.back()}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6924 9.16754L13.458 17.7485L22.0389 23.9829"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
      <div className="space-y-3 text-center">
        <p className="text-black text-2xl font-bold">Set Up Your Profile</p>
        <p className="text-gray-500  text-center">
          Please enter your details to proceed
        </p>
      </div>
      <div className="flex gap-4 items-center flex-col justify-center">
        <ProfileStep />

        {/* <StepNavigation
          stepNavHandler={stepNavHandler}
          activeSteps={activeStep}
          onStepClick={stepFunction}
        /> */}

        <div className="w-full wmax mx-auto p-6">
          {/* <div className="flex items-center justify-betwee flex-center space-x-6">
            <div className="relative w-32 h-32 rounded-full">
              <div className="flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-full h-full rounded-full">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Profile"
                    layout="fill"
                    className="object-cover rounded-[100px]"
                  />
                ) : (
                  <Image
                    src="/Images/camera.png"
                    alt="Notification Bing"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <div>
              <button
                className="text-sm text-white bg-primaryBlue px-6 py-2 rounded"
                onClick={handleButtonClick}
              >
                Add Profile Image
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Edit;
