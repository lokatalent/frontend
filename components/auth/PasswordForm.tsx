"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/formNew";

import { passwordFormSchema } from "@/lib/utils";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";

export default function PasswordForm({ type }: { type: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = passwordFormSchema(type);
  console.log(formSchema)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function navigateTo(path: string) {
    router.push(path);
  }

  

  const onSubmit = (data, e) => {
    // e.preventDefault();
    console.log(data, e);
    console.log('data')
    // router.push("reset-password/mail-verification");
  };
  // const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="w-8/12 mx-auto mt-20 mb-6 space-y-6">
      <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
              <div className="space-y-8">
                <CustomInput
                  control={form.control}
                  input="password"
                  name='New Password'
                  label="New Password"
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
                />
                <CustomInput
                  control={form.control}
                  input="password"
                  name="Confirm Password"
                  label="Confirm Password"
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
                />
              </div>
          

            <div className="flex flex-col gap-4 w-8/12 mx-auto">
              <button
                type="submit"
                // disabled={loading}
                className="p-3 bg-primaryBlue hover:bg-[#3568D4] text-white text-lg"
                // onClick={type === 'log-in' ? () => navigateTo('/') : () => navigateTo('user/email-verification')}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
