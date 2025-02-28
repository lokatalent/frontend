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
  const [defaultOpen, setDefaultOpen] = useState(open);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
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
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const reason = reasonRef.current?.value || "";

    let isValid = true;

    // Validate name if changing name
    if (form.label === "Full Name") {
      if (!validateName(`${firstName} ${lastName}`)) {
        setNameError("Please enter a valid full name (first and last name)");
        isValid = false;
      } else {
        setNameError("");
      }

      if (!validateReason(reason)) {
        setReasonError("Please provide a reason with at least 5 words");
        isValid = false;
        return;
      } else {
        setReasonError("");
      }

      let tempBio = {
        first_name: firstName,
        last_name: lastName,
        address: user.address,
      };
      const responseBio = await updateProfile(tempBio);
      if (!responseBio.error) {
        dispatch(setUser(responseBio.data));
      } else {
        handleUnauthorizedError(responseBio, dispatch, router, showToast)
      }
    }

    // If email, just validate email
    if (form.type === "email") {
      const emailValid = validateEmail(email, setNameError);
      if (emailValid) {
        setNameError("");
        const responseBio = await updateProfile({email: email});
        if (!responseBio.error) {
          dispatch(setUser(responseBio.data));
        } else {
          handleUnauthorizedError(responseBio, dispatch, router, showToast)
        }
      } else {
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

  return (
    <>
      <Dialog open={editModal} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[24rem] sm:max-w-lg w-full p-2 sm:p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal mt-2 text-center">
              Change {form.label === "Full Name" ? "Name" : "Email"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div className="max-w-m">
              <div className="space-y-4 w-full divide-y">
                <div className="py-4 w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium pb-1"
                  >
                    {form.label === "Full Name"
                      ? "Enter New Name"
                      : "Enter New Email"}
                  </label>
                  {form.label === "Full Name" ? (
                    <div className="flex gap-4">
                      <input
                        type="text"
                        id="firstName"
                        placeholder={form.text?.split(" ")?.at(0) || "first name"}
                        ref={firstNameRef}
                        className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-4 text-sm w-full"
                      />
                      <input
                        type="text"
                        id="lastName"
                        placeholder={form.text?.split(" ")?.at(-1) || "last name"}
                        ref={lastNameRef}
                        className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-4 text-sm w-full"
                      />
                    </div>
                  ) : (
                    // Email Input
                    <input
                      type="text"
                      id="fullName"
                      placeholder={form.text}
                      ref={emailRef}
                      className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-4 text-sm w-full"
                    />
                  )}
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
                <div className="mt-4 flex flex-row sm:flex-row gap-3 sm:gap-6">
                  <div>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="text-primaryBlue text-sm px-20 w-40 py-[1.8rem]"
                        onClick={() => dispatch(setEditModal(false))}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                  <Button
                    variant="default"
                    className="px-8 w-40 py-[1.8rem] text-sm hover:border-none"
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
