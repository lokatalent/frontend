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

const VerificationMailModal = ({ isError }) => {
  const [value, setValue] = useState("");
  // const []
  const isErrorEmpty = isError;
  console.log(isErrorEmpty);

  return (
    <Dialog>
      <DialogContent className="space-y-4">
        <DialogTitle className="text-center">
          Phone Number verification
        </DialogTitle>
        <div className="space-y-4">
          <p className="text-sm w-4/5 text-center mx-auto">
            To complete your request, enter the verification code we sent to
            your email
          </p>
          <InputOTPDemo value={value} setValue={setValue} />
          {/* <div className="mt-5 sm:mt-6">
            <Button className="px-16 py-6">Done</Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationMailModal;
