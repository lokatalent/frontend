"use client";

import React from "react";
import { Controller, FieldError, FieldValues, Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormFieldError } from "@/components/ui/form/FormFieldError";
import FileUpload from "@/components/profile/FileUpload";

type BaseFieldProps = {
  name: string;
  label: string;
  control: Control<FieldValues>;
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
  options?: Array<{ value: string; label: string }>;
  defaultOption?: string;
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
  const inputBaseClass = cn(
    "flex w-full rounded-md bg-white h-[3rem] px-3 py-1 text-sm shadow-s transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  const renderField = ({
    field,
    fieldState: { error },
  }: {
    field: any;
    fieldState: { error?: FieldError };
  }) => {
    switch (type) {
      case "select": {
        const { options = [], defaultOption } = props as SelectFieldProps;

        return (
          <div className="w-full space-y-2">
            <select
              {...field}
              className={inputBaseClass}
              disabled={disabled}
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={`${name}-error`}
            >
              <option value="">{placeholder || "Select an option"}</option>
              {options.length > 0 ? (
                options.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))
              ) : (
                <option disabled>No options available</option>
              )}
            </select>
            {error && (
              <FormFieldError
                error={{ message: error.message || "Invalid selection" }}
              />
            )}
          </div>
        );
      }

      case "file": {
        const { acceptedFileTypes, maxFileSizeMB } = props as FileFieldProps;
        return (
          <div className="w-full space-y-2">
            <FileUpload
              allowedTypes={acceptedFileTypes}
              maxFileSizeMB={maxFileSizeMB}
              onFileSelect={(file, url) => field.onChange(url)}
              className={inputBaseClass}
            />
            {error && <FormFieldError error={{ message: error.message }} />}
          </div>
        );
      }

      default:
        return (
          <div className="w-full space-y-2">
            <input
              type={type}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={inputBaseClass}
              aria-invalid={!!error}
              aria-required={required}
              min={1}
            />
            {error && <FormFieldError error={{ message: error.message }} />}
          </div>
        );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-2 text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => renderField({ field, fieldState })}
      />
    </div>
  );
};

export default TalentDynamicForm;
