"use client";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { FieldConfig, SignUpFormSchema } from "@/lib/utils";
import Link from "next/link";


const user = () => {
  const fields: FieldConfig[] = [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      validation: {
        required: "First Name is required",
        minLength: {
          value: 6,
          message: "First NAme must be at least 6 characters",
        },
      },
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      validation: {
        required: "Last Name is required",
        minLength: {
          value: 6,
          message: "Last Name must be at least 6 characters",
        },
      },
    },
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
      name: "number",
      type: "text",
      label: "Phone Number",
      validation: {
        required: "Phone number is required",
      },
    },
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
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
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
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
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    newPassword: "",
    confirmPassword: "",
  };

  const schemaType = SignUpFormSchema;
  return (
    <div className="w-9/12 mx-auto pt-20 pb-[2rem] space-y-6 bg-primaryBg">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-4xl text-textColor py-4">Hi there</h1>
        <p className=" mx-auto">
          Please create your account to book the best services for your needs
        </p>
      </div>

      <DynamicForm
        fields={fields}
        defaultValues={defaultValues}
        schemaType={schemaType}
        buttonAction="sign-up"
        width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]"
      />

      <footer className="flex justify-center gap-2 ">
        <p className="text-sm font-bold text-gray-600">
          Already have an account?
        </p>
        <Link href={"/login"} className="text-primaryBlue font-bold text-sm">
          Log In
        </Link>
      </footer>
    </div>
  );
};

export default user;
