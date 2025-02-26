"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import NameResponse from "./NameResponse";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setConfirmationMailModal,
  setEditModal,
  setNameResponseModal,
} from "@/store/settings/SettingsSlice";
import { setInformation } from "@/store/profile/profileSlice";
import ConfirmationMailModal from "@/components/settings/profile/ConfirmationMailModal";
import { updateProfile } from "@/services/profileService";
import { setUser } from "@/store/auth/authSlice";
import { showToast } from "@/store/auth/toastSlice";
import { handleUnauthorizedError } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FormField {
  type: "name" | "email";
  text: string;
  label: string;
}

interface EditFormProps {
  form: FormField;
  open: boolean;
  onOpenChange: () => void;
};

const validateEmail = (email, setNameError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setNameError("Please enter a valid email address");
    return false;
  } else {
    setNameError("");
    return true;
  }
};

const EditForm: React.FC<EditFormProps> = ({ form, open, onOpenChange }) => {
  console.log(open);
  const [defaultOpen, setDefaultOpen] = useState(open);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const reasonRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState("");
  const [reasonError, setReasonError] = useState("");
  
  const user = useSelector((state: any) => state.auth.user);

  //////// redux
  const editModal = useSelector((state: RootState) => state.settings.editModal);
  const dispatch = useDispatch();

  const validateName = (name: string): boolean => {
    // Basic name validation: at least two words, only letters and spaces
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(\s[A-Za-z]+)?$/;
    return nameRegex.test(name);
  };

  const validateReason = (reason: string): boolean => {
    // Check if reason has at least 5 words
    return reason.trim().split(/\s+/).length >= 5;
  };

  function splitWords(input: string): [string, string] {
    const words = input.split(" "); // Split the string by spaces
    // if (words.length !== 2) {
    //   throw new Error("Input must contain exactly two words.");
    // }
    return [words[0], words[1]];
  }
  const email = emailRef.current?.value || "";

  const handleContinue = async () => {
    const name = nameRef.current?.value || "";
    const reason = reasonRef.current?.value || "";

    let isValid = true;

    // Validate name if changing name
    if (form.label === "Full Name") {
      if (!validateName(name)) {
        setNameError("Please enter a valid full name (first and last name)");
        isValid = false;
      } else {
        console.log(name);

        setNameError("");
      }

      if (!validateReason(reason)) {
        setReasonError("Please provide a reason with at least 5 words");
        isValid = false;
        return;
      } else {
        setReasonError("");
      }

      const [firstName, lastName] = splitWords(name);
      console.log(firstName, lastName);
      let tempBio = {
        first_name: firstName,
        last_name: lastName,
        address: user.address,
        // gender: user.gender,
        // date_of_birth: user.dateofbirth
      };
      const responseBio = await updateProfile(tempBio);
      console.log(responseBio);
      if (!responseBio.error) {
        dispatch(setUser(responseBio.data));
      } else {
        handleUnauthorizedError(responseBio, dispatch, router, showToast)
      }
    }

    // If email, just validate email
    if (form.type === "email") {
      console.log(email);
      const emailValid = validateEmail(email, setNameError);
      if (emailValid) {
        console.log("Email is valid!");
        setNameError("");
        const responseBio = await updateProfile({email: email});
        if (!responseBio.error) {
          dispatch(setUser(responseBio.data));
        } else {
          handleUnauthorizedError(responseBio, dispatch, router, showToast)
        }
      } else {
        console.log("Invalid email");
        setNameError("Please enter a valid email address");
        isValid = false;
      }


    }

    // If all validations pass, open response modal
    if (isValid) {
      if (form.label === "Full Name") {
        dispatch(setInformation({ name: name, reason: reason }));
        dispatch(setNameResponseModal(true));
      } else {
        // dispatch(setInformation({ email: email }));
        dispatch(setConfirmationMailModal(true));
      }
      setIsResponseModalOpen(true);
      dispatch(setEditModal(false));
      // setDefaultOpen(false);
    }
  };
  console.log(form);

  return (
    <>
      <Dialog open={editModal} onOpenChange={onOpenChange}>
        <DialogContent className="sm:w-full w[40rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
              Change {form.label === "Full Name" ? "Name" : "Email"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center w-full items-center">
            <div className="w-full max-w-m">
              <div className="space-y-4 w-full divide-y">
                <div className="py-4 w-full -[22rem]">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium pb-1"
                  >
                    {form.label === "Full Name"
                      ? "Enter New Name"
                      : "Enter New Email"}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder={form.text}
                    ref={form.label === "Full Name" ? nameRef : emailRef}
                    className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-4 text-sm w-full"
                  />
                  {nameError && (
                    <p
                      className="text-red-500 text-[10px] items-center flex mt-1"
                      role="alert"
                    >
                      <IoWarningOutline
                        color="red"
                        size={16}
                        className="text-red-500 mr-1"
                      />
                      {nameError}
                    </p>
                  )}
                </div>
                {form.label === "Full Name" && (
                  <div className="py-4 w-full">
                    <label
                      htmlFor="nameReason"
                      className="block text-gray-700 font-medium pb-1"
                    >
                      Tell us why you want to change your name
                    </label>
                    <input
                      type="text"
                      id="nameReason"
                      ref={reasonRef}
                      placeholder="I want to change my name because..."
                      className="border-gray-300 border h-20 text-black bg-[#FAF8F81C] rounded-md px-4 py-2 w-full "
                    />
                    {reasonError && (
                      <p
                        className="text-red-500 text-[10px] items-center flex mt-1"
                        role="alert"
                      >
                        <IoWarningOutline
                          color="red"
                          size={16}
                          className="text-red-500 mr-1"
                        />
                        {reasonError}
                      </p>
                    )}
                  </div>
                )}
                <div className="mt-4 flex flex-co sm:flex-row gap-3">
                  <div>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="text-primaryBlue text-sm px-20 py-[1.8rem]"
                        onClick={() => dispatch(setEditModal(false))}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                  <Button
                    variant="default"
                    className="px-8 w-48 py-[1.8rem] text-sm hover:border-none"
                    onClick={handleContinue}
                  >
                    {form.type === "name" ? "Request New Name" : "Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <NameResponse
        open={isResponseModalOpen}
        onOpenChange={() => setIsResponseModalOpen(false)}
      />

      <ConfirmationMailModal email={email ?? ""} />
    </>
  );
};

export default EditForm;
