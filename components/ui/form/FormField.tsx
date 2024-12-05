// FormField.tsx
import React, { useState } from "react";
import {
  UseFormRegister,
  FieldError,
  RegisterOptions,
  Controller,
  ControllerProps,
} from "react-hook-form";
import { FormFieldError } from "./FormFieldError";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputDropdown from "@/components/profile/InputDropdown";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Option = {
  name: string;
};

interface FormFieldProps {
  name: keyof FormData;
  label: string;
  type: string;
  error?: FieldError;
  register: UseFormRegister<FormData>;
  control: ControllerProps<FormData, any, any>;
  disabled?: boolean;
  validation: RegisterOptions;
  width?: string;
  options: Option;
  buttonAction: string;
  // fileHandlerOptions;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type: initialType,
  error,
  register,
  control,
  disabled = false,
  validation,
  width,
  buttonAction,
  options,
  // fileHandlerOptions,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState<Date>();
  // console.log(error)

  // Determine the actual input type based on the initial type and showPassword state
  const type =
    initialType === "password"
      ? showPassword
        ? "text"
        : "password"
      : initialType;
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // const FileForm = (inputValue, file) => {
    // console.log(inputValue, file);
    // fileHandlerOptions(inputValue, file);
  // };

  // const options = [{ name: "password" }, { name: "username" }];
  // console.log(error)

  return (
    <div className={`relative flex flex-col  ${width}`}>
      <label
        htmlFor={name as string}
        className="block text-sm font-medium mb-2"
      >
        {label}
      </label>

      {type === "select" ? (
        <InputDropdown
          options={options}
          error={error}
          buttonAction={buttonAction}
          // uploadFileHandler={FileForm}
        />
      ) : type === "date" ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col w-full">
              <div className="flex items-center  bg-white">
                <div className="relative w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal p-6 pl-10",
                          !value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value && format(value, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <input
          id={name as string}
          {...register(name, validation)}
          type={type}
          className={` flex w-full rounded-md bg-white h-[3rem] px-3 py-1 text-sm shadow-s transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          ${error ? "border-red-500" : "border-gray-300"}`}
          aria-invalid={error ? "true" : "false"}
          disabled={disabled}
        />
      )}

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
      {type !== "select" ? <FormFieldError error={error} /> : null}
    </div>
  );
};
