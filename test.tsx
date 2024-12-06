// EditModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./EditForm";
import NameResponse from "./NameResponse";
import Modal from "@/components/ui/modal";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface RoleSwitchProps {
  forms: Array<{
    text: string;
    label: string;
  }>;
  title: string;
}

const EditModal: React.FC<RoleSwitchProps> = ({ title, forms }) => {
  // console.log(forms)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);


  console.log(mainModal);
  const dispatch = useDispatch();

  const handleEditClick = (form: any) => {
    setSelectedForm(form);
    setIsConfirmationModalOpen(true);
    setIsEditModalOpen(false);

    // setFormModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    setSelectedForm(null);
  };

  return (
    <>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogTrigger
          type="submit"
          className="text-sm text-primaryBlue hover:border-b pb-0 hover:border-primaryBlue"
        >
          Edit
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="space-divide-y group">
                {forms.map((form, index) => (
                  <div key={index} className="py-4">
                    <label
                      htmlFor={`input-${index}`}
                      className="block text-gray-700 font-medium pb-1"
                    >
                      {form.label}
                    </label>
                    <input
                      type="text"
                      id={`input-${index}`}
                      value={form.text}
                      readOnly
                      className="border-gray-300 border text-textGray3 bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
                    />
                    <Button
                      variant="link"
                      className="text-primaryBlue px-0 hover:border-none"
                      onClick={() => handleEditClick(form)}
                    >
                      {form.label === "Full Name"
                        ? "Request name change"
                        : form.label === "Email"
                        ? "Change Email Address"
                        : ""}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedForm && (
        <EditForm
          open={isConfirmationModalOpen}
          onOpenChange={handleConfirmationClose}
          form={selectedForm}
        />
      )}
    </>
  );
};

export default EditModal;











////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ------------------ EDITFORM -----------------------//////////////////////////
////////////////////////////////////////////////////////////////////////
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

interface FormField {
  type: "name" | "email";
  text: string;
}

interface EditFormProps {
  form: FormField;
  open: boolean;
  onOpenChange: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ form, open, onOpenChange }) => {
  console.log(open);
  const [defaultOpen, setDefaultOpen] = useState(open);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState("");
  const [reasonError, setReasonError] = useState("");

  const validateName = (name: string): boolean => {
    // Basic name validation: at least two words, only letters and spaces
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(\s[A-Za-z]+)?$/;
    return nameRegex.test(name);
  };

  const validateReason = (reason: string): boolean => {
    // Check if reason has at least 5 words
    return reason.trim().split(/\s+/).length >= 5;
  };

  const handleContinue = () => {
    const name = nameRef.current?.value || "";
    const reason = reasonRef.current?.value || "";

    let isValid = true;

    // Validate name if changing name
    if (form.type === "name") {
      if (!validateName(name)) {
        setNameError("Please enter a valid full name (first and last name)");
        isValid = false;
      } else {
        setNameError("");
      }

      if (!validateReason(reason)) {
        setReasonError("Please provide a reason with at least 5 words");
        isValid = false;
      } else {
        setReasonError("");
      }
    }

    // If email, just validate email
    if (form.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(name)) {
        setNameError("Please enter a valid email address");
        isValid = false;
      } else {
        setNameError("");
      }
    }

    // If all validations pass, open response modal
    if (isValid) {
      setIsResponseModalOpen(true);
      // setDefaultOpen(false);
    }
  };

  return (
    <>
      <Dialog open={defaultOpen} onOpenChange={onOpenChange}>
      {/* <Dialog> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
              Change {form.type}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="space-y-4 divide-y">
                <div className="py-4">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium pb-1"
                  >
                    {form.type === "name"
                      ? "Enter New Name"
                      : "Enter New Email"}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder={form.text}
                    ref={nameRef}
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
                {form.type === "name" && (
                  <div className="py-4">
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
                      className="border-gray-300 border h-20 text-black bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
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
                <div className="mt-4 flex gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="text-primaryBlue text-sm px-20 py-[1.8rem]"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
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
    </>
  );
};

export default EditForm;



////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ------------------ NAMERESPONSE -----------------------//////////////////////////
////////////////////////////////////////////////////////////////////////

// components/UserProfile.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ResponseProps {
  open: boolean;
  onOpenChange: () => void;
}

const NameResponse: React.FC<ResponseProps> = ({ open, onOpenChange }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          {/* <div className="flex justify-center items-center "> */}
          <div className="flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-l w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Response Submitted</h2>
              <p className="text-gray-600 mb-6">
                We will get back to you within 24 hours to let you know the
                update on your response. Thank you.
              </p>
              <DialogClose asChild>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Done
                </button>
              </DialogClose>
            </div>
          </div>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NameResponse;
