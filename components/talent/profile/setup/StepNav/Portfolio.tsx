"use client";
import TalentDynamicForm from "@/components/ui/form/TalentDynamicForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setProfilePics } from "@/store/profile/profileSlice";
import EditAvailability from "../../editing/EditAvailablity";


interface Availability {
  [key: string]: {
    isActive: boolean;
    from: string;
    to: string;
  };
}

// Define your schema
const schema = z.object({
  service: z
    .string()
    .nonempty("Please select a service from the list of services"),
  experience: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .transform(Number)
    .refine(
      (val) => val >= 0 && val <= 50,
      "Experience must be between 0 and 50 years"
    ),
  // images: z.string().nonempty("Pls upload your images"),
});

function Portfolio({ setActiveStep }: any) {
  const initialAvailability = {
    Monday: { isActive: true, from: "09:00", to: "17:00" },
    Tuesday: { isActive: true, from: "09:00", to: "17:00" },
    Wednesday: { isActive: false, from: "", to: "" },
    Thursday: { isActive: true, from: "10:00", to: "16:00" },
    Friday: { isActive: true, from: "09:00", to: "15:00" },
    Saturday: { isActive: false, from: "", to: "" },
    Sunday: { isActive: false, from: "", to: "" },
  };

  // State to manage availability
  const [availability, setAvailability] = useState(initialAvailability);
  const handleSaveAvailability = (updatedAvailability: typeof initialAvailability) => {
    console.log(updatedAvailability);
    setAvailability(updatedAvailability);
    // Save the updated availability data to the server or elsewhere
  };

  const dispatch = useDispatch();
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
  const onSubmit = (data: any) => {
    console.log(data);
    setActiveStep(3);
    // Additional submit logic here
  };
  const onError = (data: any) => {
    console.log(data);
    // setActiveStep(3);
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
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full flex flex-col justify-center items-center gap-12"
          >
            <div className="w-full flex flex-co flex-row flex-wrap justify-center justify-centr items-center gap-12 spce-y-4">
              <TalentDynamicForm
                type="select"
                name="service"
                label="Service Category*"
                control={control}
                options={[
                  { value: "Talent", label: "Tal  ent" },
                  { value: "UI", label: "UI" },
                  { value: "Ibadan", label: "Ibadan" },
                ]}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="number"
                name="experience"
                label="Years of Experience*"
                control={control}
                required
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
              />
              <TalentDynamicForm
                type="file"
                name="images"
                label="Upload Your Images"
                control={control}
                required
                className="w-[53rem]"
                
              />

              <div className="flex-start w-[53rem]">
                <p className="underline">Set Service Radius</p>
              </div>
              <div className="flex-start w-[53rem]">
                <EditAvailability
                  trigger={true}
                  initialAvailability={availability}
                  onSave={handleSaveAvailability}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff]"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
