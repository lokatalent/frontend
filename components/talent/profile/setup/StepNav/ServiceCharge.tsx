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
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { useRouter } from "next/navigation";

interface ServiceChargeProps {
  serviceRateEdited: (data: any) => void;
}

const ServiceChargeSchema = z.object({
  bankName: z.string().nonempty("Please select a bank"),
  accountNo: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits")
    .nonempty("Account number is required"),
  rph: z.string().nonempty("Rate per hour must be a number"),
  rps: z.string().nonempty("Rate per service must be a number"),
});

type ServiceChargeFormValues = z.infer<typeof ServiceChargeSchema>;

function ServiceCharge({ setActiveStep }: any) {
  const [isFinished, setIsFinished] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceChargeFormValues>({
    resolver: zodResolver(ServiceChargeSchema),
    defaultValues: {

      bankName: "",
      accountNo: "",
      rps: "",
      rph: "",

    },
  });

  const options = ["GTBank", "Sterling Bank", "EcoBank"];

  const onSubmit = (data: ServiceChargeFormValues) => {
    console.log("Submitted Data:", data);
    // serviceRateEdited(data);
    setIsFinished(true);
  };

  const resetDialog = () => {
    setIsFinished(false);
    setIsEditing(false);
  };

  const finishedStepHandler = () => {    
    router.push("/talent/dashboard/profile")
    setActiveStep(4);
  }

  // Success Dialog
  if (isFinished) {
    return (
      <Dialog open={isFinished} onOpenChange={resetDialog}>
        <DialogContent className="w-full p-[3rem] sm:max- lg:max-w-[25rem]">
          <DialogHeader>
            <DialogTitle className="text-center">Changes Saved</DialogTitle>
          </DialogHeader>
          <div className="w-full space-y-3">
            <div className="w-full text-center mt-2 flex-center">
              <IoIosSend color="#3377FF" size={50} />
            </div>
            <p className="w-full text-center flex-center">
              Your profile is complete! You can now proceed to verify your
              address and ID in the settings to start accepting bookings
            </p>
            <div className="w-full text-center flex-center"></div>
          </div>
          <div className="text-center mt-4">
            <DialogClose>
              <Button type="button" className="px-24 py-6 flex-center" onClick={finishedStepHandler}>
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Edit Form Content
  const formContent = (
    <div className="w-full flex-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-3 flex flex-center gap-[3rem] flex-wrap"
      >
        <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
          <label htmlFor="rps" className="block text-sm font-medium mb-2">
            Rate per Service*
          </label>
          <Controller
            name="rps"
            control={control}
            render={({ field }) => (
              <input
                id="rps"
                type="text"
                {...field}
                className="flex w-full rounded-md bg-white  h-[3.5rem] px-3 py-1 text-sm shadow-s transition-colors"
              />
            )}
          />
          {errors.rps && (
            <FormFieldError error={{ message: errors.rps.message }} />
          )}
        </div>
        <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
          <label htmlFor="rph" className="block text-sm font-medium mb-2">
            Rate per Hour*
          </label>
          <Controller
            name="rph"
            control={control}
            render={({ field }) => (
              <input
                id="rph"
                type="text"
                {...field}
                className="flex w-full rounded-md bg-white  h-[3.5rem] px-3 py-1 text-sm shadow-s transition-colors"
              />
            )}
          />
          {errors.rph && (
            <FormFieldError error={{ message: errors.rph.message }} />
          )}
        </div>
        <div className="">
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium mb-2"
                >
                  Bank Name* (Select bank )
                </label>
                <select
                  id="bankName"
                  {...field}
                  className="flex w-full rounded-md bg-white  h-[3.5rem] px-3 py-1 text-sm shadow-sm transition-colors"
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
            <FormFieldError error={{ message: errors.bankName.message }} />
          )}
        </div>
        <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
          <label
            htmlFor="accountNumber"
            className="block text-sm font-medium mb-2"
          >
            Account Number*
          </label>
          <Controller
            name="accountNo"
            control={control}
            render={({ field }) => (
              <input
                id="accountNumber"
                type="text"
                {...field}
                className="flex w-full rounded-md bg-white  h-[3.5rem] px-3 py-1 text-sm shadow-s transition-colors"
              />
            )}
          />
          {errors.accountNo && (
            <FormFieldError error={{ message: errors.accountNo.message }} />
          )}
        </div>

        <div className="w-full text-center flex-center">
          <Button type="submit" className="px-[15rem] py-8 flex-center">
            Next
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {formContent}
    </div>
  );
}

export default ServiceCharge;
