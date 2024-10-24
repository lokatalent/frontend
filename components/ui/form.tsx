"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import dpEmpty from "../../public/Images/dp-empty.png";


import fileUpload from "../../public/Images/upload.png";

function Selection({ width }) {
  return (
    <div className="flex gap-2 ">
      <div className="relative inline-block">
        <select
          id="component-select"
          className={`appearance-none  ${width} bg-white h-[3rem]  rounded px-[1rem]`} // w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]
        >
          <option value="" selected></option>
          <option
            value=""
            className="bg-[#3377FF21] hover:text-navBlue flex w-full cursor-default select-none bold items-center rounded- py-1.5 pl-2 pr-8 text-sm"
          >
            Student
          </option>
          <option value="" className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px] flex items-center h-[35px]">
            Teacher
          </option>
        </select>

        <div className="pointer-events-none absolute top-1/2 right-2 transform -translate-y-1/2">
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-black"></div>
        </div>
      </div>
    </div>
  );
}

function Form({ isFormValid, dataInput, children }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="sm:px-[4rem] lg:px-[5rem] md:px-[6rem] lg:px-[7rem] py-12 flex justify-cnter flex-col items-cener gap-12 ">
      <div className="flex gap-4 items-center flex-col justify-center">
        {children}

      
      </div>
      {/* <div className="flex justify-center">
        <Link
          href={`${pathname}/email-verification`}
          className="font-nunito text-xl text-[#fff] bg-[#3377FF] font-normal leading-6 w-[20rem] sm:w-[30rem] md:w-[32rem] lg:w-[35rem] rounded h-12 flex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
        >
          Next
        </Link>
      </div> */}
    </div>
  );
}

export default Form;
