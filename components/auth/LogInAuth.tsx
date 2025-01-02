"use client";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { FieldConfig, LogInFormSchema } from "@/lib/utils";
import Link from "next/link";

const LogInAuth = () => {
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
    {
      name: "password",
      type: "password",
      label: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: "Password must contain at least one letter and one number",
        },
      },
    },
  ];

  const defaultValues = {
    // email: "kehadconnect01@gmail.com",
    // password: "kehadtalent",
    email: "keahnney01@gmail.com",
    password: "123456789",
  };

  const schemaType = LogInFormSchema;
  return (
    <div className="">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center space-y-1">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-textColor py-2">
            Welcome Back
          </h1>
          <p className="mx-auto">
            Log in to access your account and manage your bookings
          </p>
        </div>

        <DynamicForm
          fields={fields}
          defaultValues={defaultValues}
          schemaType={schemaType}
          buttonAction="log-in"
          width="w-full"
        />
        <footer className="flex justify-center gap-2 mt-5">
          <p className="text-sm font-bold text-gray-600">
            Dont have an account?
          </p>
          <Link href={"/signup"} className="text-primaryBlue font-bold text-sm">
            Sign Up
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default LogInAuth;
