"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import InputOTPDemo from '@/components/auth/InputOTP';


function MailVerification() {
    const [isResend, setIsResend] = useState<boolean>(false);  
    	const [value, setValue] = useState("");
    const router = useRouter();

     function resendHandler() {
       setIsResend((resend) => !resend);
  }
  console.log(value)

     
  return (
    <>
      <div className="px-[2rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[7rem] py-12 flex justify-center flex-col items-cener gap-12 bg-[#FAF8F4] h-sc">
        <div className="flex justify-center relative">
          <div className="self-start cursor-pointer absolute top-[1%] left-[1%] h-12 w-12">
            <button onClick={() => router.back()}>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.6924 9.16754L13.458 17.7485L22.0389 23.9829"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/Images/email.png"
            alt="Email logo"
            width={150}
            height={150}
          />
        </div>
        <div>
          <h4 className="font-nunito text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
            Check Your Mail
          </h4>
          <p className="font-nunito text-xl text-center">
            We sent a reset link to contact@dscode...com and enter the 5 digit{" "}
            <br />
            code that mentioned in the email
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div>
            <InputOTPDemo value={value} setValue={setValue} />
          </div>
        </div>
          {isResend && (
            <div className="flex justify-center">
              <div className="bg-[#D4FFD5] w-max text-[13px] px-4 py-2 rounded border border-[#00FF26FC] flex justify-center">
                <p>
                  A code has been sent to your email. Please check and input
                </p>
              </div>
            </div>
          )}

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-8">
          <Link
            href={`../../reset-password/new-password`}
            className="font-nunito text-[14px] !text-[#fff] bg-[#3377FF]  font-normal leading-6 w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem] rounded h-12 flex items-center justify-center"
          >
            Verify
          </Link>
        </div>
        <div className="flex justify-center text text-center font-sans text-[15px] sm:text-[15px] md:text-[20px] lg:text-[20px] font-bold leading-[30px] ">
          Didn’t get a code?
          <button className="text-[#3377FF]" onClick={resendHandler}>
            Resend Code
          </button>
        </div>
      </div>
    </>
  );
}

export default MailVerification