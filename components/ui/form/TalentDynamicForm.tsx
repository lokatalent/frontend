"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormFieldError } from "@/components/ui/form/FormFieldError";
import FileUpload from "@/components/profile/FileUpload";
// Assuming you have this component

type BaseFieldProps = {
  name: string;
  label: string;
  control: any;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

type TextFieldProps = BaseFieldProps & {
  type: "text" | "email" | "password" | "number" | "tel" | "date";
};

type SelectFieldProps = BaseFieldProps & {
  type: "select";
  options: Array<{ value: string; label: string }>;
};

type FileFieldProps = BaseFieldProps & {
  type: "file";
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
};

type FormFieldProps = TextFieldProps | SelectFieldProps | FileFieldProps;

const TalentDynamicForm: React.FC<FormFieldProps> = ({
  name,
  label,
  control,
  type,
  className,
  required = false,
  disabled = false,
  placeholder = "",
  ...props
}) => {
  const baseInputStyles = cn(
    "flex w-full rounded-md bg-white h-[3rem] px-3 py-1 text-sm shadow-s transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  const renderField = ({ field, fieldState: { error } }) => {
    switch (type) {
      case "select":
        const { options } = props as SelectFieldProps;
        return (
          <div className="w-full space-y-2">
            <select
              {...field}
              className={"w-full h-[3rem] bg-white px-2"}
              disabled={disabled}
            >
              <option value="">{placeholder || "Select an option"}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <FormFieldError error={{ message: error.message }} />}
          </div>
        );

      case "file":
        const { acceptedFileTypes, maxFileSizeMB } = props as FileFieldProps;
        return (
          <div className="w-full space-y-2">
            <FileUpload
              allowedTypes={acceptedFileTypes}
              maxFileSizeMB={maxFileSizeMB}
              onFileSelect={(file, url) => field.onChange(url)}
              className={"w-full px-2"}
            />
            {error && <FormFieldError error={{ message: error.message }} />}
          </div>
        );

      default:
        return (
          <div className="w-full space-y-2">
            <input
              type={type}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={"w-full h-[3rem] px-2"}
            />
            {error && <FormFieldError error={{ message: error.message }} />}
          </div>
        );
    }
  };

  return (
    <div className={` ${className} `}>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Controller name={name} control={control} render={renderField} />
    </div>
  );
};

export default TalentDynamicForm;
