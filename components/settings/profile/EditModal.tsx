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
import NameResponse from "./NameResponse";
import Modal from "@/components/ui/modal";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setEditModal } from "@/store/settings/SettingsSlice";
import { IoWarningOutline } from "react-icons/io5";
import { securityPhoneNumberSchema } from "@/lib/utils";
import { setInformation } from "@/store/profile/profileSlice";
import { useRouter } from "next/navigation";

interface RoleSwitchProps {
  forms: Array<{
    text: string;
    label: string;
  }>;
  title: string;
}

const EditModal: React.FC<RoleSwitchProps> = ({ title, forms }) => {
  console.log(forms);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [error, setError] = useState("");
  const numberRef = useRef<HTMLInputElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const router = useRouter();

  const mainModal = useSelector((state: RootState) => state.settings.mainModal);
  const editModal = useSelector((state: RootState) => state.settings.editModal);
  console.log(mainModal);
  const dispatch = useDispatch();

  const handleEditClick = (form: any) => {
    setSelectedForm(form);
    setIsConfirmationModalOpen(true);
    setIsEditModalOpen(false);

    dispatch(setEditModal(true));

    // setFormModalOpen(true);
  };

  const handleAddressForm = () => {
    if (title === 'Address') {
      router.push("/dashboard/settings/profile/address");
      return;
    }
    return;
  }


  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    setSelectedForm(null);
    setIsEditModalOpen(false);
  };

  const handleSubmit = () => {
    const number = numberRef.current?.value || "";
    console.log(number);

    try {
      // Validate phone number using the imported schema
      const validatedNumber = securityPhoneNumberSchema.parse({ number });
      console.log(validatedNumber);
      dispatch(setInformation({ phoneNumber: validatedNumber.number }));

      // Clear any previous errors
      setError("");

      // Call the submit handler if provided

      // Close the modal
      handleConfirmationClose();
    } catch (validationError: any) {
      //  if (validationError instanceof z.ZodError) {
      setError(validationError.errors[0].message);
      //  } else {
      //  setError("An unexpected error occurred");
      //  }
    }
  };

  return (
    <>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {/* <Dialog> */}
        <DialogTrigger
          type="submit"
          className="text-sm text-primaryBlue hover:border-b pb-0 hover:border-primaryBlue"
          onClick={handleAddressForm}
        >
          Edit
        </DialogTrigger>
        {title !== "Address" && (
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
                              className="text-red-500 text-[10px] items-center flex mt-1"
                              role="alert"
                            >
                              <IoWarningOutline
                                color="red"
                                size={16}
                                className="text-red-500 mr-1"
                              />
                              {error}
                            </p>
                          )}
                        </>
                      ) : (
                        // )}
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
                  {title === "Phone Number" && (
                    <div className="mt-4 flex gap-3">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="text-primaryBlue text-sm px-20 py-[1.8rem]"
                          onClick={handleConfirmationClose}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="default"
                        className="px-8 w-48 py-[1.8rem] text-sm hover:border-none"
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
    </>
  );
};

export default EditModal;
