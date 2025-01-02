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

interface EditPortfolioProps {
  portfolioRateEdited: (data: EditPortfolioFormValues) => void;
  skills: { [key: string]: boolean };
  onSkillChange: (skill: string, value: boolean) => void;
}

const editPortfolioSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio should be at least 50 characters long")
    .max(500, "Bio should not exceed 500 characters"),
  experience: z
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

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditPortfolioFormValues>({
    resolver: zodResolver(editPortfolioSchema),
    defaultValues: {
      bio: "",
      experience: "",
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
      // await portfolioRateEdited(data);

      Object.entries(localSkills).forEach(([skill, value]) => {
        onSkillChange(skill, value);
      });
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
        <DialogContent className="w-full p-6 sm:max-w-[16rem] lg:max-w-[25rem]">
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
        <DialogContent className="w-full p-6 sm:max-w-[35rem] max-h-[90vh] overflow-y-auto">
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
              <label htmlFor="experience" className="text-sm font-medium">
                Years of Experience
              </label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="50"
                    id="experience"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter years of experience"
                  />
                )}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
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
            </div>

            {/* Service Radius */}
            <div className="flex items-center gap-6 p-4 rounded-lg">
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
            </div>

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
