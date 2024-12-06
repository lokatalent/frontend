import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setConfirmationMailModal,
} from "@/store/settings/SettingsSlice";
import Image from "next/image";
import InputOTPDemo from "@/components/auth/InputOTP";
import { IoIosSend } from "react-icons/io";

const ConfirmationMailModal: React.FC = () => {
  const [confirmModal, setConfirmModal] = useState<
    "confirm" | "confirmed" | "done"
  >("confirm");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const confirmationMailModal = useSelector(
    (state: RootState) => state.settings.confirmationMailModal
  );

  const dispatch = useDispatch();

  const otp = "111111";

  const changeModal = () => {
    setConfirmModal("confirm");
    setValue("");
    setError("");
    dispatch(setConfirmationMailModal(false));
  };

  const handleButtonClick = () => {
    switch (confirmModal) {
      case "confirm":
        setConfirmModal("confirmed");
        break;
      case "confirmed":
        if (value === otp) {
          setConfirmModal("done");
          setError("");
        } else {
          setError("Enter a correct OTP");
        }
        break;
      case "done":
        changeModal();
        break;
    }
  };

  // Reset error when value changes
  useEffect(() => {
    setError("");
  }, [value]);

  return (
    <Dialog open={confirmationMailModal} onOpenChange={changeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
            {confirmModal !== "done"
              ? "Confirm update to your email"
              : "Email Address Updated Successfully"}
          </DialogTitle>
        </DialogHeader>

        {confirmModal === "confirm" && (
          <div className="flex flex-col justify-center items-center">
            <div>
              <Image
                src="/Images/email.png"
                alt="Email logo"
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
            <p className="text-center">
              Click Send Email below, and we will send an email to
              gabamazing25@gmail.com with a link to confirm the update
            </p>
          </div>
        )}

        {confirmModal === "confirmed" && (
          <div className="space-y-4">
            <p className="text-sm w-4/5 text-center mx-auto">
              To complete your request, enter the verification code we sent to
              your email
            </p>
            <div className="flex-center">
              <Image
                src="/Images/email.png"
                alt="Email logo"
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
            <div>
              <InputOTPDemo value={value} setValue={setValue} />
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
          </div>
        )}

        {confirmModal === "done" && (
          <div className="">
            <div className="px-4 pt-4 pb-20 sm:block sm:p-0">
              <div className="mt-3 space-y-3 sm:mt-5">
                <div className="flex-center">
                  <IoIosSend color="#3377FF" size={60} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 text-center">
                    Your email address has been updated. You'll now receive
                    notifications at your new address
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {confirmModal !== "done" && (
          <div className="mt-4 flex gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="text-primaryBlue text-sm px-20 py-[1.6rem]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="default"
              className="px-8 w-48 py-[1.6rem] text-sm hover:border-none"
              onClick={handleButtonClick}
            >
              {confirmModal === "confirm" ? "Send Email" : "Confirm"}
            </Button>
          </div>
        )}

        {confirmModal === "done" && (
          <div className="mt-5 sm:mt-6 text-center">
            <Button className="px-16 py-6" onClick={changeModal}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationMailModal;
