"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setActiveTwoStepVerification,
  setTwoStepVerificationModal,
} from "@/store/settings/SettingsSlice";
import { z } from "zod";
import InputOTPDemo from "@/components/auth/InputOTP";
import { IoIosSend } from "react-icons/io";
import { RootStateProfile, setInformation } from "@/store/profile/profileSlice";

// Phone number validation schema
const phoneNumberSchema = z.object({
  number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  // .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
});

const TwoStepVerification: React.FC = () => {
  const twoStepVerification = useSelector(
    (state: RootState) => state.settings.twoStepVerificationModal
  );

  const dispatch = useDispatch();
  const numberRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [switchModal, setSwitchModal] = useState<
    "twoStep" | "verify" | "protection"
  >("twoStep");
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Reset states when modal closes
  const resetModal = () => {
    setSwitchModal("twoStep");
    setError("");
    setIsSubmitting(false);
    setValue("");
    dispatch(setTwoStepVerificationModal(false));
    if (value === OTP) {    
      dispatch(setActiveTwoStepVerification(true));
     }
  };

  const OTP = "111111";

  useEffect(() => {
    // Reset error when OTP value changes
    setError("");
  }, [value]);

  const handlePhoneSubmit = () => {
    const number = numberRef.current?.value || "";

    try {
      // Validate phone number
      phoneNumberSchema.parse({ number });
      dispatch(setInformation({ phoneNumber: number }));

      // Clear any previous errors
      setError("");
      setIsSubmitting(true);
      setPhoneNumber(number);

      // Simulating OTP send
      setTimeout(() => {
        setIsSubmitting(false);
        setSwitchModal("verify");
      }, 2000);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        // Set the first error message
        setError(validationError.errors[0].message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleOTPVerification = () => {
    if (value === OTP) {
      setSwitchModal("protection");
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  return (
    <Dialog open={twoStepVerification} onOpenChange={resetModal}>
      {switchModal === "twoStep" && (
        <DialogContent className="w-[27rem]">
          <DialogTitle className="text-center">
            Add a Phone Number for 2-Step Verification
          </DialogTitle>

          <div className="space-y-4">
            <p className="text-sm text-center text-gray-600">
              A phone number can be used as a second step to help you regain
              access if you lose your primary authentication method and to
              receive alerts for unusual account activity.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handlePhoneSubmit();
              }}
            >
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Enter Phone Number
                </label>
                <input
                  type="tel"
                  id="phonenumber"
                  ref={numberRef}
                  placeholder="+1 (123) 456-7890"
                  className="border border-gray-300 text-black bg-[#FAF8F81C] rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                  disabled={isSubmitting}
                />

                {error && (
                  <div
                    className="text-red-500 text-xs flex items-center mt-2"
                    role="alert"
                  >
                    <IoWarningOutline color="red" size={16} className="mr-2" />
                    {error}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full py-4 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          </div>
        </DialogContent>
      )}

      {switchModal === "verify" && (
        <DialogContent className="space-y-4">
          <DialogTitle className="text-center">
            Phone Number Verification
          </DialogTitle>
          <div className="space-y-4">
            <p className="text-sm w-4/5 text-center mx-auto">
              Enter the six-digit code we sent to {phoneNumber} to confirm
              authentication for your account
            </p>
            <div>
              <InputOTPDemo value={value} setValue={setValue} />
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
            <div className="mt-5 sm:mt-6 flex space-x-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setSwitchModal("twoStep")}
              >
                Resend OTP
              </Button>
              <Button className="w-1/2" onClick={handleOTPVerification}>
                Verify
              </Button>
            </div>
          </div>
        </DialogContent>
      )}

      {switchModal === "protection" && (
        <DialogContent>
          <DialogTitle className="text-center">
            You are now protected with 2-Step Verification
          </DialogTitle>
          <div className="space-y-6">
            <div className="flex justify-center">
              <IoIosSend color="#3377FF" size={60} />
            </div>
            <div>
              <p className="text-sm text-gray-500 text-center">
                Your account is now secured with 2-Step Verification. You'll
                receive additional security notifications at your registered
                phone number.
              </p>
            </div>
            <div className="flex justify-center">
              <Button className="px-16 py-6" onClick={resetModal}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TwoStepVerification;
