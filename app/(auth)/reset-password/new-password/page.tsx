"use client";
import ResetDialog from "@/components/auth/ResetDialog";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function NewPassword() {
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);

  // Toggle the visibility
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((isShow) => !isShow);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((isShow) => !isShow);
  };
  return (
    <div className="sm:px-[4rem] lg:px-[5rem] md:px-[6rem] lg:px-[7rem] py-12 flex justify-cnter h-screen flex-col items-cener gap-12 bg-[#FAF8F4]">
      <div className="flex justify-center relative">
        <div className="self-start cursor-pointer absolute top-[1%] left-[1%] h-12 w-12">
          <Link href="./">
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
            Set a New Password
          </h4>
          <p className="font-nunito text-sm text-[#989898] text-center">
            Create a new password. Ensure it differs from previous ones for
            <br />
            security
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <form className="flex flex-wrap justify-center">
          <div className="flex flex-col flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>New Password</label>
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                  required
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {!formIsValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    This password is not valid
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>Confirm Password</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {!formIsValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    Passwords are not the same
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <ResetDialog />
      </div>
    </div>
  );
}

export default NewPassword;
