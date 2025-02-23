"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { FormFieldError } from "../ui/form/FormFieldError";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { setVerificationStore } from "@/store/profile/profileSlice";

interface InputDropdownProps {
  options: string[];
  error?: any;
  buttonAction: string;
  control: any;
  register: any;
}

function InputDropdown({ options, error, buttonAction, control, register }: InputDropdownProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const dispatch = useDispatch();

  const handleServiceChange = (value: string) => {
    setSelectedService(value);

    // Dispatch to Redux store if needed
    dispatch(setVerificationStore(value));

    // Call onValueChange if provided
    onValueChange?.(value);
  };

  // Rest of the component remains the same...

  return (
    <div className="space-y-5">
      <div>
        <Select value={selectedService} onValueChange={handleServiceChange}>
          <SelectTrigger className="appearance-none w-full h-[3rem] px-3 py-1 text-sm bg-white border-2 border-white rounded-md focus:outline-none">
            {selectedService ? (
              <SelectValue>{selectedService}</SelectValue>
            ) : (
              <SelectValue placeholder="" />
            )}
          </SelectTrigger>
          <SelectContent className="w-[414px]">
            <SelectGroup>
              {options?.map((option) => (
                <SelectItem
                  value={option}
                  key={option}
                  className="focus:bg-[#3377FF3D] focus:text-[#3377FF]"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && <FormFieldError error={error} />}
      </div>
      {selectedService && (buttonAction === "addressVerification" ||
      buttonAction === "edit-address") ? (
        <FileUpload />
      ) : null}
    </div>
  );
}

export default InputDropdown;
