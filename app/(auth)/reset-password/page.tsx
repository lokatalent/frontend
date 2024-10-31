"use client";
import EmailForm from "@/components/auth/EmailForm";
import StraightForm from "@/components/ui/dynamic-form";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { emailFormSchema, FieldConfig } from "@/lib/utils";

import Image from "next/image";
import { useRouter } from "next/navigation";

type defaultValues = {
  email: string
}


function ResetPassword() {
  const router = useRouter();  

   const fields: FieldConfig[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Invalid email format",
        },
      },
    },
  ];

  const defaultValues = {
      email: "",
    }

  const schemaType = emailFormSchema;

  return (
    <>
      <div className="px-[2rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[7rem] h-screen py-12 flex justify-center flex-col items-cener gap-12 bg-[#FAF8F4]">
        <div className="flex flex-col justify-center relative">
          

          <div className="flex justify-center">
            <Image
              src="/Images/lock.png"
              alt="Lock"
              width={120}
              height={120}
              priority
            />
          </div>
          <div>
            <h4 className="font-nunito text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
              Forgot Password
            </h4>
            <p className="font-nunito text-sm text-[#6C727F] text-center w-[90%] mx-auto">
              Enter the email address associated with your account and we’ll
              send you a link to <br /> reset your password
            </p>
          </div>
          <div className="self-center">
            {/* <EmailForm type="email-input" /> */}
            <DynamicForm
              fields={fields}
              defaultValues={defaultValues}
              schemaType={emailFormSchema}
              buttonAction="reset-password"
              width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
            />
            {/* <StraightForm /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
