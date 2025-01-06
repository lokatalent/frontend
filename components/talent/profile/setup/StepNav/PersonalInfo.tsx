"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile, updateProfileImage } from "@/services/profileService";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { setProfilePics } from "@/store/profile/profileSlice";
import { setUser } from "@/store/auth/authSlice";

// Define your schema
const schema = z.object({
  gender: z.string().nonempty("Please select a Gender"),
  address: z.string().nonempty("Enter your address"),
  city: z.string().nonempty("Pls enter your city name"),
  state: z.string().nonempty("Pls enter your city state"),
  country: z.string().nonempty("Please select a country name"),
  dateofbirth: z.string().nonempty("Start date is required"),
});

function PersonalInfo({ setActiveStep }: any) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const fileInputRef = useRef<HTMLInputElement>();
  const user = useSelector((state: any) => state.auth.user);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(user.avatar ?? null);

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageLoading(true);
      const imageUrl: string = URL.createObjectURL(file);
      const images = {
        image: file,
      };
      const response = await updateProfileImage(images);
      console.log(response);
      if (!response.error) {
        setImageLoading(false);
        dispatch(
          showToast({
            status: "success",
            message: "Image updated successfully",
          })
        );
        let tempBio = {
          state: user.state,
          city: user.city,
          country: user.country,
          address: user.address,
          gender: user.gender,
          date_of_birth: user.dateofbirth,
          bio: response.data,
        };
        const responseBio = await updateProfile(tempBio);
        console.log(responseBio);
        dispatch(setUser(responseBio.data));
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

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (data: any) => {
    // console.log(data);
    let temp = {
      // state: data.state,
      // city: data.city,
      // country: data.country,
      address: `${data.address}, ${data.city},${data.state}, ${data.country}, `,
      gender: data.gender,
      date_of_birth: data.dateofbirth,
    };
    const response = await updateProfile(temp);

    if (response.status !== 200) {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
      return;
    }
    dispatch(
      showToast({
        status: "success",
        message: "Profile updated successfully!",
      })
    );
    dispatch(setUser(response.data));
    setActiveStep(1);

    // Additional submit logic here
  };

  return (
    <div className="">
      <div className="flex gap-4 items-center flex-col justify-center">
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
        <div className="w-full wmax mx-auto p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-12"
          >
            <div className="w-full flex flex-co flex-row flex-wrap justify-center justify-centr items-center gap-12 spce-y-4">
              <TalentDynamicForm
                type="select"
                name="gender"
                label="Gender"
                control={control}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="date"
                name="dateofbirth"
                label="Date of Birth"
                control={control}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />
              <TalentDynamicForm
                type="select"
                name="country"
                label="Country"
                control={control}
                defaultOption="Nigeria"
                options={[{ value: "Nigeria", label: "Nigeria" }]}
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                required
              />
              <TalentDynamicForm
                type="text"
                name="city"
                label="City"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="text"
                name="state"
                label="State"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="text"
                name="address"
                label="Address"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
