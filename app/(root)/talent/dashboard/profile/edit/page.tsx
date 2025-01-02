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
    <div className="">
      <section className="bg-primaryBg bg-red relative">
        <div className="self-start cursor-pointer absolute top-[10%] sm:top-[1%] md:top-[1%] lg:top-[10%] left-[3%] h-12 w-12">
          <div onClick={() => router.back()}>
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
      </section>
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-black text-2xl font-bold">Set Up Your Profile</p>
          <p className="text-gray-500  text-center">
            Please enter your details to proceed
          </p>
        </div>
        <div className="flex w-full gap-4 items-center flex-col justify-center">
          <ProfileStep />
        </div>
      </div>
    </div>
  );
}

export default Edit;
