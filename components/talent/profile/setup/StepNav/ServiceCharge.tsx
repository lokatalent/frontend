"use client";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateBankProfile } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import { setBankDetailsData } from "@/store/talent/profile/TalentProfileSlice";

interface ServiceChargeProps {
  serviceRateEdited: (data: any) => void;
}

const ServiceChargeSchema = z.object({
  bankName: z.string().nonempty("Please select a bank"),
  accountNo: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits")
    .nonempty("Account number is required"),
  // rph: z.string().nonempty("Rate per hour must be a number"),
  // rps: z.string().nonempty("Rate per service must be a number"),
});

type ServiceChargeFormValues = z.infer<typeof ServiceChargeSchema>;

function ServiceCharge({ setActiveStep }: any) {
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  let [bankData, setBankData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    function extractBankDetails(bankArray) {
      return bankArray.map((bank) => ({
        id: bank.id,
        name: bank.name,
        code: bank.code,
      }));
      // .map(bank => bank.name);
    }
    let getBanks = async () => {
      let response = await axios.get("https://api.paystack.co/bank");
      // setBankData(response.data.data);
      // Example usage:
      const simplifiedBanks = extractBankDetails(response.data.data);
      setBankData(simplifiedBanks);
    };
    getBanks();
  }, []);
  console.log(bankData);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceChargeFormValues>({
    resolver: zodResolver(ServiceChargeSchema),
    defaultValues: {
      bankName: "",
      accountNo: "",
      // rps: "",
      // rph: "",
    },
  });

  const options = ["GTBank", "Sterling Bank", "EcoBank"];

  const onSubmit = async (data: ServiceChargeFormValues) => {
    console.log("Submitted Data:", data);
    let temp = {
      bank_name: data.bankName,
      account_num: data.accountNo,
      bank_code: "",
    };
    const matchedBank = bankData.find((bank) => bank.name === temp.bank_name);
    if (matchedBank) {
      temp.bank_code = matchedBank.code; // Update bank_code with the matching bank's code
    }
    console.log(temp);
    // serviceRateEdited(data);

    const response = await updateBankProfile(temp);
    console.log(response);
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
        message: "Bank details updated successfully!",
      })
    );
    dispatch(setBankDetailsData(response.data));
    setIsFinished(true);
  };

  const resetDialog = () => {
    setIsFinished(false);
    setIsEditing(false);
  };

  const finishedStepHandler = () => {
    router.push("/talent/dashboard/profile");
    setActiveStep(4);
  };

  // Success Dialog
  if (isFinished) {
    return (
      <Dialog open={isFinished} onOpenChange={resetDialog}>
        <DialogContent
          className="w-full p-[3rem] sm:max- lg:max-w-[25rem]"
          aria-describedby={undefined}
        >
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
              <Button
                type="button"
                className="px-24 py-6 flex-center"
                onClick={finishedStepHandler}
              >
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
        {/* <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
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
        </div> */}
        {/* <div className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]">
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
        </div> */}
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
                  {bankData.map((option) => (
                    <option value={option.name} key={option.name}>
                      {option.name}
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

  return <div>{formContent}</div>;
}

export default ServiceCharge;
