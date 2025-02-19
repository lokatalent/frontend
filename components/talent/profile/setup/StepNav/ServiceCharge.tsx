"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { updateBankProfile } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler, handleUnauthorizedError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const userBankDetails = useSelector((state: any) => state?.talentProfile?.bankDetails);
  const defaultFormValues = {
    bankName: userBankDetails?.bank_name || "",
    accountNo: userBankDetails?.account_num || "",
  };

  const router = useRouter();
  useEffect(() => {
    function extractBankDetails(bankArray: any) {
      return bankArray.map((bank: any) => ({
        id: bank.id,
        name: bank.name,
        code: bank.code,
      }));
      // .map(bank => bank.name);
    }
    let getBanks = async () => {
      let response = await axios.get("https://api.paystack.co/bank");
      const simplifiedBanks = extractBankDetails(response.data.data);
      setBankData(simplifiedBanks);
    };
    getBanks();
  }, []);
  // console.log(bankData);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceChargeFormValues>({
    resolver: zodResolver(ServiceChargeSchema),
    values: defaultFormValues,
  });

  const options = ["GTBank", "Sterling Bank", "EcoBank"];

  const onSubmit = async (data: ServiceChargeFormValues) => {
    let temp = {
      bank_name: data.bankName,
      account_num: data.accountNo,
      bank_code: "",
    };

    if (
      (temp.bank_name === defaultFormValues.bankName) &&
      (temp.account_num === defaultFormValues.accountNo)
    ) {
      setActiveStep(3);
      return;
    }
    const matchedBank: any = bankData.find(
      (bank: any) => bank.name === temp.bank_name
    );
    if (matchedBank) {
      temp.bank_code = matchedBank.code; // Update bank_code with the matching bank's code
    }

    const response = await updateBankProfile(temp);
    if (!response.error) {
      // success
      dispatch(
        showToast({
          status: "success",
          message: "Bank details updated successfully!",
        })
      );
      dispatch(setBankDetailsData(response.data));
      setActiveStep(3);
    } else {
      // error
              handleUnauthorizedError(response, dispatch, router, showToast);
      
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
      
    }
  };

  const resetDialog = () => {
    setIsFinished(false);
    setIsEditing(false);
  };

  const finishedStepHandler = () => {
    router.push("/talent/dashboard/profile");
    setActiveStep(3);
  };

  // Edit Form Content
  const formContent = (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium mb-2"
                >
                  Bank Name* (Select bank )
                </label>
                <select
                  id="bankName"
                  {...field}
                  className="w-full rounded-md bg-white h-[3.5rem] px-3 py-1 text-sm shadow-sm transition-colors border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
                >
                  <option value="">Select a bank</option>
                  {bankData.map((option: any) => (
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
        <div>
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
                className="w-full rounded-md bg-white h-[3.5rem] px-3 py-1 text-sm shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            )}
          />
          {errors.accountNo && (
            <FormFieldError error={{ message: errors.accountNo.message }} />
          )}
        </div>
        <div className="w-full flex justify-center col-span-1 sm:col-span-2">
          <Button
            type="submit"
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-14 text-white bg-[#3377FF] font-normal leading-6 rounded transition hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377FF]">
            Next
          </Button>
        </div>
      </form>
    </div>
  );

  return <div>{formContent}</div>;
}

export default ServiceCharge;
