"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import email from "@/assets/images/verify.png";
// import number from "@/assets/images/phone.png";
import email from "@/public/Images/email.png";
import number from "@/public/Images/number.png";
import InputOTPDemo from "@/components/auth/InputOTP";
import { Button } from "@/components/ui/button";
import SuccessScreen from "@/components/auth/SuccessScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Verify {
  title: string;
  comment: string;

}

const Verify = () => {
	const router = useRouter();
	const [value, setValue] = useState("");
	const [isEmail, setIsEmail] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResend, setIsResend] = useState<boolean>(false);

  function resendHandler() {
    // setIsResend((resend) => !resend);
    setIsResend(true);
  }


  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, 2000);
  }, [isError]);

  useEffect(() => {
    setTimeout(() => {
      setIsResend(false);
    }, 2000);
  }, [isResend]);

	const handleVerify = () => {
    // if ()
    if (value.length !== 6) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSuccess(true);
    // router.push('./verified')
	};
	return (
    <div className="h-screen lg:h-max">
      <div
        className={`${
          isSuccess ? "hidden" : "block"
        } w-10/12 mx-auto flex flex-col items-center justify-center p-14`}
      >
        <Image
          src={isEmail ? email : number}
          width={194}
          height={194}
          alt="mail icon"
        />

        <p className="font-bold text-textColor text-2xl md:text-3xl py-3">
          {isEmail ? "Email verification" : "Phone Number Verification"}
        </p>
        <p className="text-textColor pb-5 text-center">
          {isEmail
            ? "Enter the six digit code we sent to your email address to verify your account"
            : "Enter the six digit code we sent to your phone number to verify your account"}
        </p>

        <InputOTPDemo value={value} setValue={setValue} />
        {isResend && (
          <div className="flex justify-center mt-5">
            <div className="bg-[#D4FFD5] w-max text-[13px] px-4 py-2 rounded border border-[#00FF26FC] flex justify-center">
              <p>A code has been sent to {isEmail? 'your email' : 'phone number'}. Please check and input</p>
            </div>
          </div>
        )}
        {isError && (
          <div className="flex justify-center  mt-5">
            <div className="bg-red-300 w-max text-[13px] px-4 py-2 rounded border border-red-500 text-black flex justify-center">
              <p>Ensure you enter the valid code</p>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4  my-14">
          <Button
            onClick={() => setIsEmail(!isEmail)}
            className="verifyButton font-nunito text-[14px] !text-[#605dec] bg-[#f6f5ff] border-[#605dec] border  "
          >
            {isEmail ? "Verify Phone Number Instead" : "Verify Email Instead"}
          </Button>
          <Button
            onClick={handleVerify}
            className="verifyButton font-nunito text-[14px] !text-[#fff] bg-[#3377FF]"
          >
            {isEmail ? "Verify  Email " : "Verify "}
          </Button>
        </div>

        <div className="flex justify-center text text-center font-sans text-[15px] sm:text-[15px] md:text-[20px] lg:text-[20px] font-bold leading-[30px] ">
          Didn’t get a code?
          <button className="text-[#3377FF]" onClick={resendHandler}>
            Resend Code
          </button>
        </div>
      </div>

      <div className={`${isSuccess ? "block" : "hidden"}`}>
        <SuccessScreen
          head={isEmail ? "Email Verified" : "Phone Number Verified"}
          content="Your details as a Super Admin has been verified and you can now proceed to the dashboard"
          btn="Proceed to Dashboard"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default Verify;
