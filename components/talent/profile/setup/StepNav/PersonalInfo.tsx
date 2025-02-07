"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile, updateProfileImage } from "@/services/profileService";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler, handleUnauthorizedError } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { setProfilePics } from "@/store/profile/profileSlice";
import { setUser, setUserAvatar } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

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
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const fileInputRef = useRef<HTMLInputElement | null>();
  const user = useSelector((state: any) => state.auth.user);
  const [imageLoading, setImageLoading] = useState(false);
  const userSelectedImage = useSelector((state: any) => state.auth.user.avatar);
  const [selectedImage, setSelectedImage] = useState<any>(user.avatar ?? null);

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageLoading(true);
      const imageURL: string = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      dispatch(setUserAvatar(imageURL));
      const images = {
        image: file,
      };
      const response = await updateProfileImage(images);
      if (!response.error) {
        const remoteImgURL = response.data.url ? `${response.data.url as string}?t=${new Date().getTime()}` : response.data.url;
        setSelectedImage(remoteImgURL);
        dispatch(setUserAvatar(remoteImgURL));
        setImageLoading(false);
        dispatch(
          showToast({
            status: "success",
            message: "Image updated successfully",
          })
        );
      } else {
        setImageLoading(false);
        handleUnauthorizedError(response, dispatch, router, showToast);
      }
    }
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: any) => {
    // console.log(data);
    let temp = {
      address: `${data.address}, ${data.city}, ${data.state}, ${data.country}`,
      gender: data.gender,
      date_of_birth: data.dateofbirth,
    };
    const response = await updateProfile(temp);

    if (!response.error) {
      // success
      dispatch(
        showToast({
          status: "success",
          message: "Profile updated successfully!",
        })
      );
      dispatch(setUser(response.data));
      dispatch(setUserAvatar(response.data.avatar));
      setActiveStep(1);
    } else {
      // error
      handleUnauthorizedError(response, dispatch, router, showToast);

      return;
    }
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
              disabled={imageLoading}
            >
              {imageLoading ? <Spinner /> : "Update Profile Image"}
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
