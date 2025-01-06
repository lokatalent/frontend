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
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ChangesSaved from "../ChangesSaved";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import { updateBankProfile } from "@/services/profileService";
import { useDispatch } from "react-redux";
import { setBankDetailsData } from "@/store/talent/profile/TalentProfileSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  // rps: z.string().nonempty("Rate per service must be a number"),
});

type EditServiceRateFormValues = z.infer<typeof editServiceRateSchema>;

function EditServiceRate({ serviceRateEdited }: EditServiceRateProps) {
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();
   let [bankData, setBankData] = useState([]);

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditServiceRateFormValues>({
    resolver: zodResolver(editServiceRateSchema),
    defaultValues: {
      bankName: "",
      accountNo: "",
      // rps: "",
      rph: "",
    },
  });

  const options = ["GTBank", "Sterling Bank", "EcoBank"];

  const onSubmit = async (data: EditServiceRateFormValues) => {
    console.log("Submitted Data:", data);
        let temp = {
          bank_name: data.bankName,
          account_num: data.accountNo,
          bank_code: "",
        };
        const matchedBank: any = bankData.find((bank: any) => bank.name === temp.bank_name);
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
            {/* <div className="w-[16rem]">
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
            </div> */}
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
