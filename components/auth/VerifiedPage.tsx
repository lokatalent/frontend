/* eslint-disable react/prop-types */
"use client";

import mark from "@/public/Images/mark.png";
import Image from "next/image";
import Link from "next/link";

type titleProp = {title :string, text: string, to?: string}

function VerifiedPage({ title, text, to }: titleProp) {
console.log(to)
  return (
    <>
      <div className="px-[2rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[7rem] h-screen py-12 flex justify-center flex-col items-cener gap-12 bg-[#FAF8F4]">
        <div className="flex flex-col justify-center relative">
          {/* <div className="self-start cursor-pointer absolute top-[-50%] sm:top-[1%] md:top-[1%] lg:top-[1%] left-[1%] h-12 w-12">
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
          </div> */}

          <div className="flex justify-center">
            <Image
              src={mark}
              alt="Complelted logo"
              className="w-[10rem] h-[12rem]"
            />
          </div>
          <div>
            <h4 className="font-nunito text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
              {title} Verified
            </h4>
            <p className="font-nunito text-sm text-center w-3/5 mx-auto text-[#6C727F]">
              Lorem ipsum lore et itat ipsum et itat ipsumet <br />itat ipsumet itat
              ipsum
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <Link
            href={`/${to ? to : ""}`}
            className="font-nunito text-[14px] !text-[#fff] bg-[#3377FF] font-normal leading-6 w-[20rem] rounded h-12 flex items-center justify-center"
          >
            {text}
          </Link>
        </div>
      </div>
    </>
  );
}

export default VerifiedPage;
