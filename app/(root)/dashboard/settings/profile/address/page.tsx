"use client";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import dp from "@/public/Images/dp.png";
import { useRouter } from "next/navigation";
import han from "@/public/Images/hamburger.svg";
import { allowedCountries, editAddressFormSchema, FieldConfig, profileFormSchema } from "@/lib/utils";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { setProfilePics } from "@/store/profile/profileSlice";
import { useDispatch } from "react-redux";

const fields: FieldConfig[] = [
  {
    name: "state",
    type: "text",
    label: "State*",
    validation: {
      required: "Select a State",
      minLength: {
        value: 6,
        message: "State must be at least 3 characters",
      },
    },
  },
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
  {
    name: "addressVerification",
    type: "select",
    label: "Address Verification*",
    options: [
      "Electricity bill",
      "Waste Bill",
      "Tenancy of Agreement",
      "Bank Statement with Address",
    ],
    validation: {
      required: "Select the type Address Verification",
    },
  },
];

const schemaType = editAddressFormSchema;

function Edit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
 
 
  const router = useRouter();

  const defaultValues = {
    gender: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    address: "",
  };

  return (
    <div className="h-screen">
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
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="space-y-3">
          <p className="text-black text-4xl font-bold">
            Edit your Address Details
          </p>
          <p className="text-gray-500  text-center">
            Update your address details and keep your information accurate and
            up to date
          </p>
        </div>

        <div>
          <DynamicForm
            fields={fields}
            defaultValues={defaultValues}
            schemaType={schemaType}
            buttonAction="edit-address"
            width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
