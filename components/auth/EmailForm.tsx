"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/formNew";

import { emailFormSchema } from "@/lib/utils";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";

export default function EmailForm({ type }: { type: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = emailFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  // console.log(form);

  function navigateTo(path: string) {
    router.push(path);
  }

  // function onSubmit(data: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   setLoading(true);
  //   console.log('valuesss');
  //   console.log(data);
  //   // type === "log-in" ? console.log('mama') : router.push("/signup/verify-email");
  //   // setLoading(false);
  // }

  const onSubmit = (data, e) => {
    console.log(data, e);
    console.log('data')
    router.push("reset-password/mail-verification");
  };
  // const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="w-8/12 mx-auto mt-20 mb-6 space-y-6">
      <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <div className="space-y-8">
                <CustomInput
                  control={form.control}
                  input="email"
                  label="Email"
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-8/12 mx-auto">
              <button
                type="submit"
                disabled={loading}
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