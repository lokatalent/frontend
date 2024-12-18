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
import ChangesSaved from "../ChangesSaved";

interface EditServiceRateProps {
  serviceRateEdited: (data: any) => void; // Adjust type as needed
}

// Define Zod schema for form validation
const editServiceRateSchema = z.object({
  bankName: z.string().nonempty("Please select a bank"),
  accountNo: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits")
    .nonempty("Account number is required"),
  rph: z.string().nonempty("Rate per hour must be a number"),
  rps: z.string().nonempty("Rate per service must be a number"),
});

type EditServiceRateFormValues = z.infer<typeof editServiceRateSchema>;

function EditServiceRate({ serviceRateEdited }: EditServiceRateProps) {
  const [isFinished, setIsFinished] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditServiceRateFormValues>({
    resolver: zodResolver(editServiceRateSchema),
    defaultValues: {
      bankName: "GTBank",
      accountNo: "1234567890",
      rps: "11098",
      rph: "98745",
    },
  });

  const options = ["GTBank", "Sterling Bank", "EcoBank"];

  const onSubmit = (data: EditServiceRateFormValues) => {
    console.log("Submitted Data:", data);
    serviceRateEdited(data);
    setIsFinished(true); // Transition to confirmation view
  };

  const resetDialog = () => {
    setIsFinished(false);
  };

  return (
    <Dialog onOpenChange={resetDialog}>
      <DialogTrigger asChild>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center mr-10">
          <FaPen color="#3377FF" size={10} />
        </div>
      </DialogTrigger>
      {isFinished ? (
        <DialogContent className="w-full p-[3rem] sm:max-w-[16rem] lg:max-w-[25rem]">
          <DialogHeader>
            <DialogTitle className="text-center">Changes Saved</DialogTitle>
          </DialogHeader>
          <ChangesSaved />
          <div className="text-center mt-4">
            <DialogClose>
              <Button
                type="submit"
                className="px-24 py-6 flex-center"
                //   onClick=}
              >
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-full p-[3rem] sm:max-w-[30rem] lg:max-w-[40rem]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit</DialogTitle>
            <p>
              Update your service rates and bank details to ensure accurate
              payments and competitive pricing.
            </p>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-3 flex flex-wrap"
          >
            <div className="w-[16rem]">
              <Controller
                name="bankName"
                control={control}
                render={({ field }) => (
                  <div>
                    <label
                      htmlFor="bankName"
                      className="block text-sm font-medium mb-2"
                    >
                      Bank Name
                    </label>
                    <select
                      id="bankName"
                      {...field}
                      className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-sm transition-colors"
                    >
                      <option value="">Select a bank</option>
                      {options.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
              {errors.bankName && (
                <p className="text-red-500 text-sm">
                  {errors.bankName.message}
                </p>
              )}
            </div>
            <div className="w-[16rem]">
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium mb-2"
              >
                Account Number
              </label>
              <Controller
                name="accountNo"
                control={control}
                render={({ field }) => (
                  <input
                    id="accountNumber"
                    type="text"
                    {...field}
                    className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-s transition-colors"
                  />
                )}
              />
              {errors.accountNo && (
                <p className="text-red-500 text-sm">
                  {errors.accountNo.message}
                </p>
              )}
            </div>
            <div className="w-[16rem]">
              <label htmlFor="rps" className="block text-sm font-medium mb-2">
                Rate per Service
              </label>
              <Controller
                name="rps"
                control={control}
                render={({ field }) => (
                  <input
                    id="rps"
                    type="text"
                    {...field}
                    className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-s transition-colors"
                  />
                )}
              />
              {errors.rps && (
                <p className="text-red-500 text-sm">{errors.rps.message}</p>
              )}
            </div>
            <div className="w-[16rem]">
              <label htmlFor="rph" className="block text-sm font-medium mb-2">
                Rate per Hour
              </label>
              <Controller
                name="rph"
                control={control}
                render={({ field }) => (
                  <input
                    id="rph"
                    type="text"
                    {...field}
                    className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-s transition-colors"
                  />
                )}
              />
              {errors.rph && (
                <p className="text-red-500 text-sm">{errors.rph.message}</p>
              )}
            </div>
            <div className="w-full text-center flex-center">
              <Button type="submit" className="px-24 py-6 flex-center">
                Update Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default EditServiceRate;
