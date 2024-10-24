"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function FormDetails({ isFormValid }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const pathname = usePathname();
  console.log(pathname);

  // Toggle the visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className="sm:px-[4rem] lg:px-[5rem] md:px-[6rem] lg:px-[7rem] py-12 flex justify-cnter flex-col items-cener gap-12 bg-[#FAF8F4]">
      <div className="flex justify-center relative">
        <div className="self-start cursor-pointer absolute top-[1%] left-[1%] h-12 w-12">
          <Link href="/signup">
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
          </Link>
        </div>

        <div>
          <h4 className="font-nunito text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
            Hi there
          </h4>
          <p className="font-nunito text-xl text-center">
            Please enter your details to be able to lorem ipsum <br />
            lorem ipsum lorem ipsium
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <form className="flex flex-row flex-wrap justify-center">
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col gap-[0.5rem]">
              <label>First Name</label>
              <input
                type="text"
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem] bg-white h-[3rem] text-[#3377FF] rounded px-[1rem]"
              />
              {!isFormValid ? (
                <div className="text-[10px] text-[#FFB82E]">
                  Enter a valid name
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <label>Last name</label>
              <input
                type="text"
                className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem] bg-white h-[3rem] text-[#3377FF] rounded px-[1rem] placeholder"
              />
              {!isFormValid ? (
                <div className="text-[10px] text-[#FFB82E]">
                  Enter a valid name
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {!isFormValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    This password is not valid
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {isFormValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    Passwords does not match
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <Link
          href={`${pathname}/email-verification`}
          className="font-nunito text-xl text-[#fff] bg-[#3377FF] font-normal leading-6 w-[20rem] sm:w-[30rem] md:w-[32rem] lg:w-[35rem] rounded h-12 flex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
        >
          Submit
        </Link>
      </div>
    </div>
  );
}

export default FormDetails