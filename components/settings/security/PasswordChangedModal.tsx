"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";

const PasswordChangedModal = ({ showModal, setShowModal}) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger
        type="submit"
        className="font-nunito mt-10 text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[23rem] mx-auto rounded h-14  hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
      >
        Update
      </DialogTrigger>
      <DialogContent className="w-[27rem]">
        <div className="">
          <div className="px-4  pt-4 pb-20 sm:block sm:p-0">
            <div className="mt-3 space-y-3 sm:mt-5">
              <Button
                size={"icon"}
                className="bg-white rounded-full shadow-lg hover:bg-none"
              >
                <IoIosSend color="#3377FF " />
              </Button>

              <h3 className="text-lg leading-6 font-bold text-gray-900">
                Changes Updated
              </h3>
              <div className="">
                <p className="text-sm text-gray-500">
                  Your password has been successfully updated.
                  <br /> Use your new password to log in next time.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <DialogClose asChild>
              <Button className="px-16 py-6">Done</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangedModal;
