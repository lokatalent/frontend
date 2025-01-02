"use client";
import Image from "next/image";
import React from "react";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProfileCompletionProps {
  addText?: string;
  linkTo: string;
}

function ProfileCompletion({
  addText = " You have to complete your profile set up",
  linkTo,
}: ProfileCompletionProps) {
  return (
    <div className="bg-white w-full rounded-br-md rounded-tr-md p-6 flex space-x-6 items-center border-[#DF8600] border-l-[5px]">
      {/* <div className="flex items-center space-x-6"> */}
        <div className="flex items-center justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
          <Image
            src="/Images/notification-bing.png"
            alt="Notification Bing"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <p className="text-primaryBlue text-sm">Complete profile set up</p>
          <BiSolidRightArrowAlt className="hidden sm:block text-primaryBlue" />
          <p className="text-[12px] sm:text-sm">{addText}</p>
          <div>
            <Link
              href={linkTo}
              className="text-white text-sm sm:text-base h-10 rounded-md py-2 bg-primaryBlue px-[3rem]"
            >
              Complete
            </Link>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default ProfileCompletion;

