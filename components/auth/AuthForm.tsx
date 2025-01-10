"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form
} from "@/components/ui/formNew";

import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";

export default function AuthForm({ type }: { type: string }) {
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const formSchema = authFormSchema(type);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "sss",
      password: "ssssssddss",
    },
  });
 


  // function navigateTo(path: string) {
  //   router.push(path);
  // }


  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    // type === "log-in" ? console.log('mama') : router.push("/signup/verify-email");
    setLoading(false);
  }

  return (
    <div className="w-8/12 mx-auto mt-20 mb-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-4xl text-textColor py-4">
          {type === "log-in" ? "Welcome Back" : "Hi there"}
        </h1>
        <p className="w-1/2 mx-auto">
          {type === "log-in"
            ? "Please enter your details to be able to lorem ipsum lorem ipsum lorem ipsium"
            : "Please enter your details to be able to lorem ipsum lorem ipsum lorem ipsium"}
        </p>
      </div>
      {/* <Form {...form}>
        <div className="flex flex-col items-center justify-center">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "log-in" && (
              <div>
                <div className="space-y-8">
                  <CustomInput
                    control={form.control}
                    input="email"
                    label="Email"
                    placeholder=" "
                    {...form.register("email", {
                      required: true,
                      maxLength: 80,
                    })}
                    width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
                  />
                  <CustomInput
                    control={form.control}
                    input="password"
                    label="Password"
                    placeholder=" "
                    {...form.register("password", {
                      required: true,
                      maxLength: 80,
                    })}
                    width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
                  />
                </div>
                <div className="self-end text-right mt-3">
                  <Link href="reset-password" className="text-primaryBlue">
                    Forgot Password
                  </Link>
                </div>
              </div>
            )}

            {type === "sign-up" && (
              <div className="flex flex-wrap gap-6">
                <CustomInput
                  control={form.control}
                  input="text"
                  label="First Name"
                  name=""
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                />
                <CustomInput
                  control={form.control}
                  input="text"
                  label="Last Name"
                  name=""
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                />
                <CustomInput
                  control={form.control}
                  input="password"
                  label="Password"
                  name=""
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                />
                <CustomInput
                  control={form.control}
                  input="password"
                  label="Confirm Password"
                  name=""
                  placeholder=" "
                  width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
                />
              </div>
            )}

            <div className="flex flex-col gap-4 w-8/12 mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="p-3 bg-primaryBlue hover:bg-[#3568D4] text-white text-lg"
                // onClick={type === 'log-in' ? () => navigateTo('/') : () => navigateTo('user/email-verification')}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" size={20} /> &nbsp;
                    Loading
                  </div>
                ) : type === "log-in" ? (
                  "Login"
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </Form> */}
     

      {type == "log-in" && (
        <footer className="flex justify-center gap-2 ">
          <p className="text-sm font-normal text-gray-600">
            {type === "log-in"
              ? "Dont have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "log-in" ? "/signup" : "/login"}
            className="text-primaryBlue text-sm"
          >
            {type === "log-in" ? " Sign Up" : " Log In"}
          </Link>
        </footer>
      )}
    </div>
  );
}
