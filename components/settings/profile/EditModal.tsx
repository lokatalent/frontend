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
import {
  handleUnauthorizedError,
  securityPhoneNumberSchema,
  getMaxDateOfBirth
} from "@/lib/utils";
import { setInformation } from "@/store/profile/profileSlice";
import { useRouter } from "next/navigation";
import { RootStateAuth, setUser } from "@/store/auth/authSlice";
import { updateProfile } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";
import { format } from "date-fns";
import Datepicker from "react-tailwindcss-datepicker";

interface RoleSwitchProps {
  forms: Array<{
    text: string;
    label: string;
  }>;
  title: string;
}
const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'yyyy-MM-dd');
};

const formatPhoneNumber = (phoneNumber: string) => {
  // Remove any whitespace for cleaner processing
  const trimmedNumber = phoneNumber.trim();

  // Check if the number starts with "+234"
  if (trimmedNumber.startsWith("+234")) {
    return trimmedNumber;
  }

  // If it starts with "0", replace the leading "0" with "+234"
  if (trimmedNumber.startsWith("0")) {
    return `+234${trimmedNumber.slice(1)}`;
  }

  // Otherwise, just prepend "+234"
  return `+234${trimmedNumber}`;
};

const isValidDate = (dateString: string): boolean => {
  const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return dateRegex.test(dateString);
};

const EditModal: React.FC<RoleSwitchProps> = ({ title, forms }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [error, setError] = useState("");
  const numberRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useSelector((state: RootStateAuth) => state.auth.user);

  const defaultDateValue = user?.date_of_birth?.split("T")?.at(0) || getMaxDateOfBirth();
  const [dateValue, setDateValue] = useState({
    startDate: new Date(defaultDateValue),
    endDate: new Date(defaultDateValue),
  })

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
      // if (user.service_role === "service_provider") {
      //   router.push("/talent/dashboard/settings/profile/address");
      // }
      // router.push("/dashboard/settings/profile/address");
    }
  };

  const handleConfirmationClose = () => {
    setSelectedForm(null);
    setIsEditModalOpen(false);
  };

  const handleSubmit = async () => {
    let temp = {};
    if (title === "Date of Birth") {
      const birthday = dateValue.startDate; // birthdayRef.current?.value?;
      console.log(birthday);
      if (!isValidDate(format(birthday, "yyyy-MM-dd"))) {
        setError("Invalid date.");
        return;
      }
      temp = {
        // date_of_birth: formatDate(birthdayRef.current?.value),
        date_of_birth: format(birthday, "yyyy-MM-dd"),
      }
    } else {
      const number = numberRef.current?.value || "";
      try {
        const validatedNumber = securityPhoneNumberSchema.parse({ number });
        temp = {
          phone_num: formatPhoneNumber(number),
        };
      } catch(err: any) {
        setError("Invalid phone.");
        return;
      }
    }

    const response = await updateProfile(temp);
    if (!response.error) {
      dispatch(setUser(response.data));
      dispatch(setInformation({
        phoneNumber: response.data.phone_num,
        dateOfBirth: response.data.date_of_birth,
      }));
    } else {
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
    setError("");
    handleConfirmationClose();
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
          <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[26rem] sm:max-w-lg w-full p-4 sm:p-6 rounded-lg">
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
                        title === "Date of Birth" && form.label === "Date of Birth" ? (
                          <>
                            {
                              /*
                              <input
                                type="date"
                                id={`input-${index}`}
                                placeholder={form.text?.split("T")?.at(0) || ""}
                                ref={birthdayRef}
                                max={getMaxDateOfBirth()}
                                min={"1901-01-01"}
                                className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
                              />
                              */
                              <Datepicker
                                inputId="datepicker"
                                inputName="datepicker"
                                required={true}
                                useRange={false}
                                asSingle={true}
                                maxDate={new Date(getMaxDateOfBirth())}
                                minDate={new Date("1901-01-01")}
                                value={dateValue}
                                onChange={(newValue) => setDateValue(newValue)}
                                ref={birthdayRef}
                              />
                            }
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
                        )
                      )}
                      {}
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
                  {(title === "Phone Number" || title === "Date of Birth") && (
                    <div className="mt-4 flex flex-row sm:flex-row gap-3">
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
