"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile, updateProfileImage } from "@/services/profileService";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import {
  errorHandler,
  handleUnauthorizedError,
  formatDateTime,
  getMaxDateOfBirth
} from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { setProfilePics } from "@/store/profile/profileSlice";
import { setUser, setUserAvatar } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { format } from "date-fns";

// Define your schema
const schema = z.object({
  gender: z.string().nonempty("Please select a Gender"),
  address: z.string().nonempty("Enter your address"),
  city: z.string().nonempty("Pls enter your city name"),
  state: z.string().nonempty("Pls enter your city state"),
  country: z.string().nonempty("Please select a country name"),
  // dateofbirth: z.string().nonempty("Date of birth is required"),
  dateofbirth: z.object({
    startDate: z.date({required_error: "Date of birth is required"}),
    endDate: z.date({required_error: "Date of birth is required"}),
  }),
});

function PersonalInfo({ setActiveStep }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const defaultDateValue = user?.date_of_birth?.split("T")?.at(0) || getMaxDateOfBirth();
  const defaultFormValues = {
    gender: user?.gender || "",
    city: user?.address?.split(",")?.at(-3)?.trim() || "",
    country: "Nigeria",
    state: user?.address?.split(",")?.at(-2)?.trim() || "",
    address: user?.address.split(",")?.slice(0, -3)?.join(", ")?.trim() || "",
    // dateofbirth: user?.date_of_birth?.split("T")?.at(0) || getMaxDateOfBirth(),
    dateofbirth: {
      startDate: new Date(defaultDateValue),
      endDate: new Date(defaultDateValue),
    },
  };
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    values: defaultFormValues,
  });

  const fileInputRef = useRef<HTMLInputElement | null>();
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
    let temp = {
      address: `${data.address}, ${data.city}, ${data.state}, ${data.country}`,
      gender: data.gender,
      date_of_birth: format(data.dateofbirth.startDate, "yyy-MM-dd"),
    };
    console.log(temp);
    if (
      (temp.address === `${defaultFormValues.address}, ${defaultFormValues.city}, ${defaultFormValues.state}, ${defaultFormValues.country}`) &&
      (temp.gender === user?.gender) &&
      (temp.date_of_birth === user?.date_of_birth?.split("T")?.at(0))
    ){
      setActiveStep(1);
      return;
    }
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
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full">
          <div className="flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-full h-full rounded-full">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Profile"
                layout="fill"
                className="object-cover rounded-full"
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
        <button
          className="text-sm text-white bg-primaryBlue px-4 sm:px-6 py-2 rounded"
          onClick={handleButtonClick}
          disabled={imageLoading}
        >
          {imageLoading ? <Spinner /> : "Update Profile Image"}
        </button>
      </div>
      <div className="w-full max-w-4xl mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
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
              className="w-full"
            />
            <TalentDynamicForm
              type="date"
              name="dateofbirth"
              label="Date of Birth"
              control={control}
              className="w-full"
              minDate={new Date("1901-01-01")}
              maxDate={new Date(getMaxDateOfBirth())}
              required
            />
            <TalentDynamicForm
              type="select"
              name="country"
              label="Country"
              control={control}
              defaultOption="Nigeria"
              options={[{ value: "Nigeria", label: "Nigeria" }]}
              className="w-full"
              required
            />
            <TalentDynamicForm
              type="text"
              name="city"
              label="City"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="state"
              label="State"
              control={control}
              required
              className="w-full"
            />
            <TalentDynamicForm
              type="text"
              name="address"
              label="Street Address"
              control={control}
              required
              className="w-full"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-sm text-white bg-[#3377FF] font-normal leading-6 w-full max-w-xs sm:max-w-sm lg:max-w-md rounded h-14 transition hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377FF]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalInfo;
