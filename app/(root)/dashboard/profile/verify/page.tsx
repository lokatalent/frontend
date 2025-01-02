"use client";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { addressVerificationFormSchema, FieldConfig } from "@/lib/utils";

type defaultValues = {
  addressVerify: string;
};
const fields: FieldConfig[] = [
  {
    name: "addressVerify",
    type: "select",
    options: [
      "Electricity bill",
      "Waste Bill",
      "Tenancy of Agreement",
      "Bank Statement with Address",
    ],
    label: "Address Verification",
    validation: {
      required: "Select any form of address verification",
    },
  },
];

function ResetPassword() {
  const defaultValues: defaultValues = {
    addressVerify: "",
  };

  // const schemaType = emailFormSchema;

  return (
    <>
      <div className="px-[2rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[7rem] h-screen py-12 flex  flex-col items-cener gap-12 bg-[#FAF8F4]">
        <div className="flex flex-col  relative">
          <div>
            <h4 className="font-nunito text-base text-center sm:text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
              Verify your Address
            </h4>
            <p className="font-nunito text-[12px] sm:text-base text-[#6C727F] text-center w-[90%] mx-auto">
              Confirm your address to help us serve you better, no matter where
              your services are needed
            </p>
          </div>

          <div className="self-center">
            <DynamicForm
              fields={fields}
              defaultValues={defaultValues}
              schemaType={addressVerificationFormSchema}
              buttonAction="addressVerification"
              width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
