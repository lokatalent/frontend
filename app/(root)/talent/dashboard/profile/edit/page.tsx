"use client";
/**
 * The Edit function is responsible for rendering the edit profile page in the talent dashboard.
 * It includes a back button, a profile setup header, and a profile step component.

 */
import React from "react";
import { useRouter } from "next/navigation";
import ProfileStep from "@/components/talent/profile/ProfileStep";

function Edit() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <section className="w-full max-w-[500px] mx-auto mt-6 flex items-center">
        <div className="cursor-pointer flex items-center">
          <div onClick={() => router.back()} className="p-2">
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
          </div>
        </div>
        <div className="flex-1 text-center">
          <p className="text-black text-2xl font-bold">Set Up Your Profile</p>
        </div>
      </section>
      <div className="w-full max-w-[500px] mx-auto space-y-6 mt-6 sm:mt-8">
        <p className="text-gray-500 text-sm sm:text-base text-center">
          Please enter your details to proceed
        </p>
        <div className="flex flex-col items-center w-full">
          <ProfileStep />
        </div>
      </div>
    </div>
  );
}

export default Edit;
