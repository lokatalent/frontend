"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldConfig, profileFormSchema } from "@/lib/utils";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { setProfilePics } from "@/store/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage } from "@/services/profileService";
import Spinner from "@/components/ui/Spinner";
import { showToast } from "@/store/auth/toastSlice";
import axios from "axios";

function Edit() {
  let [bankData, setBankData] = useState([]);

  let getBanks = async () => {
    let response = await axios.get("https://api.paystack.co/bank");
    setBankData(response.data.data);
  };

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
      name: "dateOfBirth",
      type: "date",
      label: "Date of Birth*",
      validation: {
        required: "Date of Birth is required",
      },
    },
    {
      name: "country",
      type: "select",
      label: "Country*",
      options: ["Nigeria"],
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
      name: "street_addr",
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
      name: "bank_name",
      type: "select",
      label: "Bank*",
      options: bankData,
      validation: {
        required: "Select a bank",
      },
    },
    {
      name: "acc_num",
      type: "text",
      label: "Account Number*",
      validation: {
        required: "Account number is required",
        minLength: {
          value: 6,
          message: "Account number must be at least 6 characters",
        },
      },
    },
  ];

  const schemaType = profileFormSchema;
  const user = useSelector((state: any) => state.auth.user);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(user.avatar ?? null);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageLoading(true);
      const imageUrl: string = URL.createObjectURL(file);
      const images = {
        image: file,
      };
      const response = await updateProfileImage(images);
      if (!response.error) {
        setImageLoading(false);
        dispatch(
          showToast({
            status: "success",
            message: "Image updated successfully",
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
      setSelectedImage(imageUrl);
      // Make sure setSelectedImage is defined in your component
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
    street_addr: "",
    bank_name: "",
    acc_num: "", 
  };

  useEffect(() => {
    getBanks()
  }, [])

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
      <div className="flex gap-4 items-center flex-col justify-center py-10">
        <div className="space-y-3">
          <p className="text-black text-center text-xl md:text-3xl font-bold">
            Set Up Your Profile
          </p>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            Please enter your details to start booking on Lokatalent today.
          </p>
        </div>

        <div className="flex items-center justify-between space-x-6">
          <div className="relative w-14 h-14 sm:w-24 sm:h-24 rounded-full">
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
              className="text-[12px] sm:text-sm text-white bg-primaryBlue px-6 py-2 rounded"
              onClick={handleButtonClick}
            >
              {imageLoading ? <Spinner /> : "Update Profile Image"}
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
