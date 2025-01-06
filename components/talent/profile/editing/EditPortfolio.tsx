"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import ChangesSaved from "../ChangesSaved";
import { useDispatch, useSelector } from "react-redux";
// import { getService } from "@/services/profileService";
// import {
//   RootStateTalentService,
//   setService,
// } from "@/store/talent/service/TalentServiceSlice";

import { errorHandler } from "@/lib/utils";
import { showToast } from "@/store/auth/toastSlice";
import { getAllService, updateService } from "@/services/services";
import { setService } from "@/store/talent/service/TalentServiceSlice";
import { updateProfile } from "@/services/profileService";
import { setUser } from "@/store/auth/authSlice";

interface EditPortfolioProps {
  portfolioRateEdited: (data: EditPortfolioFormValues) => void;
  skills: { [key: string]: boolean };
  onSkillChange: (skill: string, value: boolean) => void;
}

const editPortfolioSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio should be at least 1 characters long")
    .max(500, "Bio should not exceed 500 characters"),
  experience_years: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .transform(Number)
    .refine(
      (val) => val >= 0 && val <= 50,
      "Experience must be between 0 and 50 years"
    ),
});

type EditPortfolioFormValues = z.infer<typeof editPortfolioSchema>;

export default function EditPortfolio({
  portfolioRateEdited,
  skills,
  onSkillChange,
}: EditPortfolioProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [localSkills, setLocalSkills] = useState(skills);
  const [isOnline, setIsOnline] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const user = useSelector((state: any) => state.auth.user);
  const service = useSelector((state: any) => state.service.service);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditPortfolioFormValues>({
    resolver: zodResolver(editPortfolioSchema),
    defaultValues: {
      bio: user?.bio,
      experience_years: service?.experience_years,
    },
  });

  // Watch bio field for character count
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (value.bio) {
        setCharCount(value.bio.length);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const resetDialog = () => {
    setIsFinished(false);
    setLocalSkills(skills);
  };

  const handleCheckboxChange =
    (skill: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: event.target.checked,
      }));
    };

  const onSubmit = async (data: EditPortfolioFormValues) => {
    try {
      // portfolioRateEdited(data);
      let tempBio = {
        state: user.state,
        city: user.city,
        country: user.country,
        address: user.address,
        gender: user.gender,
        date_of_birth: user.dateofbirth,
        bio: data.bio,
      };
      const responseBio = await updateProfile(tempBio);
      console.log(responseBio);
      dispatch(setUser(responseBio.data));

      console.log(data);
      let temp = {
        experience_years: +data.experience_years,
        service_type: service?.service_type,
        service_desc: service?.service_desc,
        rate_per_hour: service?.rate_per_hour,
        address: service?.address,
        availablity: service?.availablity,
      };
      const response1 = await getAllService(user.id);
      console.log("All Services Response:", response1);

      if (response1?.data || response1.data.length > 0) {
        const response = await updateService(temp);
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(setService(response.data));
        } else {
          dispatch(
            showToast({
              status: "error",
              message: errorHandler({
                message: "You need to create a service before editing",
              }),
            })
          );
        }
        setIsFinished(true);
        return;
      }

      // Object.entries(localSkills).forEach(([skill, value]) => {
      //   // for setting 2 or more skills
      //   // onSkillChange(skill, value);

      //   // for setting 1 skills NOTE: Only for now
      //   // If the current skill is the selected one, set it to true
      //   if (skill === skill) {
      //     onSkillChange(skill, true);
      //   } else {
      //     // Set all other skills to false
      //     onSkillChange(skill, false);
      //   }
      // });
      setIsFinished(true);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Dialog onOpenChange={resetDialog}>
      <DialogTrigger asChild>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex items-center justify-center mr-10 cursor-pointer hover:bg-gray-200 transition-colors">
          <FaPen color="#3377FF" size={10} />
        </div>
      </DialogTrigger>

      {isFinished ? (
        <DialogContent
          className="w-full p-6 sm:max-w-[16rem] lg:max-w-[25rem]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Changes Saved Successfully
            </DialogTitle>
          </DialogHeader>
          <ChangesSaved />
          <div className="text-center mt-4">
            <DialogClose>
              <Button
                type="button"
                className="px-6 py-2 hover:bg-blue-600 transition-colors"
                onClick={() => setIsFinished(false)}
              >
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      ) : (
        <DialogContent
          className="w-full p-6 sm:max-w-[35rem] max-h-[90vh] overflow-y-auto"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold mb-6">
              Edit Portfolio
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Bio Field */}
            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="text-sm font-medium flex items-center gap-2"
              >
                Add your Bio 😉
              </label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <textarea
                      {...field}
                      id="bio"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Tell clients about your experience, skills, and expertise..."
                      onChange={(e) => {
                        field.onChange(e);
                        setCharCount(e.target.value.length);
                      }}
                    />
                    <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                      {charCount}/500
                    </span>
                  </div>
                )}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>

            {/* Experience Field */}
            <div className="space-y-2">
              <label htmlFor="experience_years" className="text-sm font-medium">
                Years of Experience
              </label>
              <Controller
                name="experience_years"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="50"
                    id="experience_years"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter years of experience"
                  />
                )}
              />
              {errors.experience_years && (
                <p className="text-red-500 text-sm">
                  {errors.experience_years.message}
                </p>
              )}
            </div>

            {/* Skills Section */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium">Skills & Expertise</label>
              <div className="flex flex-wrap gap-3">
                {Object.entries(localSkills).map(([skill, selected]) => (
                  <div
                    key={skill}
                    className="flex items-center  rounded-lg p-2  transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      checked={selected}
                      onChange={handleCheckboxChange(skill)}
                      id={`skill-${skill}`}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="text-sm cursor-pointer"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Service Radius */}
            {/* <div className="flex items-center gap-6 p-4 rounded-lg">
              <div className="flex  items-center gap-2">
                <p className="text-sm font-medium">Service Radius</p>

                <span className="text-[#DF8600]">(2 KM)</span>
              </div>
              <button
                type="button"
                className="text-primaryBlue text-sm hover:underline focus:outline-none"
              >
                Change
              </button>
            </div> */}

            {/* Online Status */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className="flex items-center gap-3 py-3 text-sm font-medium text-gray-700 bg-white  transition-all"
              >
                <span>Click to go online </span>
                <div
                  className={`h-5 w-5 rounded flex items-center justify-center transition-colors ${
                    isOnline ? "bg-green-500" : "border-2 border-gray-300"
                  }`}
                >
                  {isOnline && <Check className="text-white" size={14} />}
                </div>
              </button>
              <p className="text-xs text-gray-500">
                (Appearing online means you are now marked as available and
                ready to take on new jobs immediately)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
