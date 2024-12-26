"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import email from "@/assets/images/verify.png";
// import number from "@/assets/images/phone.png";
import InputOTPDemo from "@/components/auth/InputOTP";
import SuccessScreen from "@/components/auth/SuccessScreen";
import { Button } from "@/components/ui/button";
import email from "@/public/Images/email.png";
import number from "@/public/Images/number.png";
import { useRouter } from "next/navigation";
import { sendEmailOTP, sendPhoneOTP, verifyEmailOTP } from "@/services/authService";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setLoggedin } from "@/store/auth/authSlice";

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
  const dispatch = useDispatch();

  const resendHandler = async () => {
    const response: any = await isEmail ? sendEmailOTP() : sendPhoneOTP();
    if (!response.error) {
      setIsResend(true);
      // redirect to verify account
    } else {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
    // setIsResend((resend) => !resend);
   
  };

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

  const handleVerify = async () => {
    if (value.length !== 6) {
      setIsError(true);
      return;
    }
    // verify OTP
    let data = {
      verification_code: Number(value),
    };
    const response = await verifyEmailOTP(data);
    if (!response.error) {
      setIsError(false);
      setIsSuccess(true);
    } else {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
    // router.push('./verified')
  };

  return (
    <div className="">
      <div
        className={`${
          isSuccess ? "hidden" : "block"
        } xl:w-10/12 mx-auto flex flex-col items-center justify-center`}
      >
        <div className="relative aspect-square w-44">
          <Image src={isEmail ? email : number} fill alt="mail icon" />
        </div>

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
              <p>
                A code has been sent to{" "}
                {isEmail ? "your email" : "phone number"}. Please check and
                input
              </p>
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
        <div className="flex flex-col sm:flex-row gap-4 mt-10 mb-5">
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

        <div className="flex gap-2 justify-center text text-center font-sans text-sm md:text-base leading-[30px] ">
          Didn’t get a code?
          <button
            className="text-[#3377FF] font-semibold"
            onClick={resendHandler}
          >
            Resend Code
          </button>
        </div>
      </div>

      <div className={`${isSuccess ? "block " : "hidden"}`}>
        <SuccessScreen
          head={isEmail ? "Email Verified" : "Phone Number Verified"}
          content="Your email address has been successfully verified.
You can now enjoy full access to all our features and services."
          btn="Proceed to Dashboard"
          onClick={() => {
            dispatch(setLoggedin(true));
            router.push("/dashboard");
          }}
        />
      </div>
    </div>
  );
};

export default Verify;
