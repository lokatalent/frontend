"use client"
import DynamicForm from "@/components/ui/form/DynamicForm";
import { FieldConfig, LogInFormSchema, SignUpFormSchema } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LogIn = () => {
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
        email: "aaa",
        password: '',
    };

    const schemaType = LogInFormSchema;
    return (
      <div className="w-8/12 mx-auto mt-20 mb-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-4xl text-textColor py-4">
            Welcome Back
          </h1>
          <p className="w-1/2 mx-auto">

            Please enter your details to be able to lorem ipsum lorem ipsum lorem ipsium
              
          </p>
        </div>
        
        <DynamicForm
          fields={fields}
          defaultValues={defaultValues}
          schemaType={schemaType}
          buttonAction="log-in"
        />

        
          <footer className="flex justify-center gap-2 ">
            <p className="text-sm font-normal text-gray-600">
              
                Dont have an account?
                
            </p>
            <Link
              href={"/signup"}
              className="text-primaryBlue text-sm"
            >
              Sign Up
            </Link>
          </footer>
        
      </div>
    );
};

export default LogIn;
