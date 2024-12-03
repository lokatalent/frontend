// FormField.tsx
import React from "react";
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form";

import { FormFieldError } from "./FormFieldError";

import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormFieldProps {
  name: keyof FormData;
  label: string;
  type: string;
  error?: FieldError;
  register: UseFormRegister<FormData>;
  disabled?: boolean;
  validation: RegisterOptions;
  width?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type: initialType,
  error,
  register,
  disabled = false,
  validation,
  width,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Determine the actual input type based on the initial type and showPassword state
  const type =
    initialType === "password"
      ? showPassword
        ? "text"
        : "password"
      : initialType;
  console.log(error);
  console.log(name);
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={`relative flex flex-col  ${width}`}>
      <label
        htmlFor={name as string}
        className="block text-sm font-medium mb-2"
      >
        {label}
      </label>

      <input
        id={name as string}
        {...register(name, validation)}
        type={type}
        className={`flex w-full rounded-md bg-white h-[3rem] px-3 py-1 text-sm shadow-s transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500" : "border-gray-300"}`}
        aria-invalid={error ? "true" : "false"}
        disabled={disabled}
      />
      {initialType === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-[2%] top-[50%] translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <FaEye className="h-4 w-4" color="black" />
          ) : (
            <FaEyeSlash className="h-4 w-4" color="black" />
          )}
        </button>
      )}
      <FormFieldError error={error} />
    </div>
  );
};
