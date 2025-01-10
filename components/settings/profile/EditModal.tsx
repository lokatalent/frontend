"use client";

// components/UserProfile.js
import React, { useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, setEditModal } from "@/store/settings/SettingsSlice";
import { IoWarningOutline } from "react-icons/io5";
import { handleUnauthorizedError, securityPhoneNumberSchema } from "@/lib/utils";
import { setInformation } from "@/store/profile/profileSlice";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/auth/authSlice";
import { updateProfile } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";

interface RoleSwitchProps {
  forms: Array<{
    text: string;
    label: string;
  }>;
  title: string;
}

const EditModal: React.FC<RoleSwitchProps> = ({ title, forms }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [error, setError] = useState("");
  const numberRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  

  const mainModal = useSelector((state: RootState) => state.settings.mainModal);
  const editModal = useSelector((state: RootState) => state.settings.editModal);
  const dispatch = useDispatch();

  const handleEditClick = (form: any) => {
    setSelectedForm(form);
    setIsEditModalOpen(false);
    dispatch(setEditModal(true));
  };

  const handleAddressForm = () => {
    if (title === "Address") {
      router.push("/dashboard/settings/profile/address");
    }
  };

  const handleConfirmationClose = () => {
    setSelectedForm(null);
    setIsEditModalOpen(false);
  };

  const handleSubmit = async () => {
    const number = numberRef.current?.value || "";

    try {
      const validatedNumber = securityPhoneNumberSchema.parse({ number });
      console.log(number, validatedNumber)
      let temp = {
        address: user.address,
        number: validatedNumber.number
        // gender: user.gender,
        // date_of_birth: user.dateofbirth
      };
      const response = await updateProfile(temp);
      console.log(response);
      if (!response.error) {
        dispatch(setUser(response.data));
        dispatch(setInformation({ phoneNumber: validatedNumber.number }));
      } else {
        handleUnauthorizedError(response, dispatch, showToast, router);
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
      }
      setError("");
      handleConfirmationClose();
    } catch (validationError: any) {
      setError(validationError.errors[0].message);
    }
  };

  return (
    <div>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogTrigger
          type="submit"
          className="text-sm text-primaryBlue hover:border-b pb-0 hover:border-primaryBlue"
          onClick={handleAddressForm}
        >
          Edit
        </DialogTrigger>
        {title !== "Address" && (
          <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[27rem] sm:max-w-lg w-full p-4 sm:p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-normal mt-2 text-center">
                {title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg w-full">
                <div className="space-y-6">
                  {forms.map((form, index) => (
                    <div key={index} className="py-2">
                      <label
                        htmlFor={`input-${index}`}
                        className="block text-gray-700 font-medium pb-1"
                      >
                        {form.label}
                      </label>
                      {title === "Phone Number" &&
                      form.label === "Phone Number" ? (
                        <>
                          <input
                            type="text"
                            id={`input-${index}`}
                            placeholder={form.text}
                            ref={numberRef}
                            className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
                          />
                          {error && (
                            <p
                              className="text-red-500 text-xs flex items-center mt-1"
                              role="alert"
                            >
                              <IoWarningOutline
                                color="red"
                                size={16}
                                className="mr-1"
                              />
                              {error}
                            </p>
                          )}
                        </>
                      ) : (
                        <input
                          type="text"
                          id={`input-${index}`}
                          value={form.text}
                          readOnly
                          className="border-gray-300 border text-textGray3 bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
                        />
                      )}
                      <Button
                        variant="link"
                        className="text-primaryBlue px-0 mt-2"
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
                  {title === "Phone Number" && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="text-primaryBlue w-full sm:w-auto px-6 py-3"
                          onClick={handleConfirmationClose}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="default"
                        className="w-full sm:w-auto px-6 py-3"
                        onClick={handleSubmit}
                        type="submit"
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {selectedForm && (
        <EditForm
          open={editModal}
          onOpenChange={handleConfirmationClose}
          form={selectedForm}
        />
      )}
    </div>
  );
};

export default EditModal;
