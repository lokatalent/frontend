import React, { useState, useEffect } from "react";
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
import ChangesSaved from "../ChangesSaved";

interface EditPortfolioProps {
  portfolioRateEdited: (data: EditPortfolioFormValues) => void;
  skills: { [key: string]: boolean };
  onSkillChange: (skill: string, value: boolean) => void;
}

// Zod schema for form validation
const editPortfolioSchema = z.object({
  bio: z.string().nonempty("Please add your bio."),
  experience: z.string().nonempty("Experience is required."),
});

type EditPortfolioFormValues = z.infer<typeof editPortfolioSchema>;

export default function EditPortfolio({
  portfolioRateEdited,
  skills,
  onSkillChange,
}: EditPortfolioProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [localSkills, setLocalSkills] = useState(skills); // Local state for skills

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditPortfolioFormValues>({
    resolver: zodResolver(editPortfolioSchema),
    defaultValues: {
      bio: "John Smith",
      experience: "2",
    },
  });

  // Reset local skills when modal opens or closes
  const resetDialog = () => {
    setIsFinished(false);
    setLocalSkills(skills); // Revert to default skills when modal closes
  };

  const handleCheckboxChange =
    (skill: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: event.target.checked,
      }));
    };

    const onSubmit = (data: EditPortfolioFormValues) => {
      
        setIsFinished(true); // Show "Changes Saved"
        
        
            portfolioRateEdited(data);
        // Update skills globally only on form submission
        Object.entries(localSkills).forEach(([skill, value]) => {
          onSkillChange(skill, value);
        });
            
        
        
        

  };

  return (
    <Dialog onOpenChange={resetDialog}>
      <DialogTrigger asChild>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center mr-10 cursor-pointer">
          <FaPen color="#3377FF" size={10} />
        </div>
      </DialogTrigger>
      {isFinished ? (
        <DialogContent className="w-full p-6 sm:max-w-[16rem] lg:max-w-[25rem]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Changes Saved
            </DialogTitle>
          </DialogHeader>
          <ChangesSaved />
          <div className="text-center mt-4">
            <DialogClose>
              <Button type="button" className="px-6 py-2" onClick={() => setIsFinished(false)}>
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-full p-6 sm:max-w-[30rem] lg:max-w-[30rem]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Edit Portfolio
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2">
                Add your Bio
              </label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <input
                    id="bio"
                    type="text"
                    {...field}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring focus:ring-blue-300"
                  />
                )}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Experience Field */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium mb-2"
              >
                Years of Experience
              </label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <input
                    id="experience"
                    type="text"
                    {...field}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring focus:ring-blue-300"
                  />
                )}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(localSkills).map(([skill, selected]) => (
                <div className="flex items-center" key={skill}>
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selected}
                    onChange={handleCheckboxChange(skill)}
                  />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" className="px-6 py-2">
                Update Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
