"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputOTPDemo from "@/components/auth/InputOTP";

const PhoneNumberVerification = () => {
  const [value, setValue] = useState("");

  return (
    <Dialog>
      <DialogContent className="space-y-4">
        <DialogTitle className="text-center">
          Phone Number verification
        </DialogTitle>
        <div className="space-y-4">
          <p className="text-sm w-4/5 text-center mx-auto">
            Enter the six digit code we sent to your phone number to confirm
            authentication your account
          </p>
          <InputOTPDemo value={value} setValue={setValue} />
          <div className="mt-5 sm:mt-6">
            <Button className="px-16 py-6">Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneNumberVerification;
