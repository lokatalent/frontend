"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

const ChangesSaved = () => {
  return (
    <div className="w-full space-y-3">
      <div className="w-full text-center mt-2 flex-center">
        <IoIosSend color="#3377FF" size={50} />
      </div>
      <span className="w-full text-center flex-center">
        The updates will be reflected across your profile immediately.
      </span>
      <div className="w-full text-center flex-center">
        
      </div>
    </div>
  );
};

export default ChangesSaved;
