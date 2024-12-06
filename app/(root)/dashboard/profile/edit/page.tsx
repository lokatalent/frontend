"use client";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import dp from "@/public/Images/dp.png";
import { useRouter } from "next/navigation";
import han from "@/public/Images/hamburger.svg";
import { allowedCountries, FieldConfig, profileFormSchema } from "@/lib/utils";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { setProfilePics } from "@/store/profile/profileSlice";
import { useDispatch } from "react-redux";

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
  //  {
  //    name: "dateofBirth",
  //    type: "date",
  //    label: "Date of Birth*",
  //    validation: {
  //      required: "Date of Birth is required",
  //       minLength: {
  //         value: 1,
  //         message: "Date of Birth must be at least 6 characters",
  //       },
  //    },
  //  },
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
 ];

	const schemaType = profileFormSchema;



function Edit() {
   const [selectedImage, setSelectedImage] = useState<any>(null);
   const dispatch = useDispatch();
   const fileInputRef = useRef<any>(null);

  
  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl: string = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Make sure setSelectedImage is defined in your component
      dispatch(setProfilePics(imageUrl));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
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
      <div className="flex gap-4 items-center flex-col justify-center">
        <div className="space-y-3">
          <p className="text-black text-4xl font-bold">Set Up Your Profile</p>
          <p className="text-gray-500  text-center">
            Please enter your details to proceed
          </p>
        </div>

        <div className="flex items-center justify-between space-x-6">
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
        </div>

        <div>
          <DynamicForm
            fields={fields}
            defaultValues={defaultValues}
            schemaType={schemaType}
            buttonAction="profile-edit"
            width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
