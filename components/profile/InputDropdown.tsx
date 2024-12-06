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
import fileUpload from "@/public/Images/upload.png";
import Image from "next/image";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { setVerificationStore } from "@/store/profile/profileSlice";

interface InputDropdownProps {
  options: string[];
  error?: string;
  buttonAction: string;
}

function InputDropdown({ options, error, buttonAction }: InputDropdownProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const dispatch = useDispatch();
  console.log(buttonAction);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    console.log(value);
    dispatch(setVerificationStore(value));
  };

  // const fileHandler = (file: File) => {
  // console.log(file);
  // console.log(selectedService);
  // uploadFileHandler(selectedService, file);
  // };

  const uploadHandler = () => {};

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
