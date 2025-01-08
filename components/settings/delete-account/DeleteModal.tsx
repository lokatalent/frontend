"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteUserAccount } from "@/services/authService";
import { handleUnauthorizedError } from "@/lib/utils";
import { showToast } from "@/store/auth/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function DeleteModal() {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const modalSwitchHandler = async () => {
    const response = await deleteUserAccount();
    console.log(response);
    if (!response.error) {
      setIsDelete(true);
    } else {
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const modalDeleteHandler = () => {
    setIsDelete(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="font-nunito text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-full md:w-[12rem] lg:w-[20rem] mx-auto rounded h-14 lex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
      >
        Delete
      </DialogTrigger>
      <DialogContent className="w-full p-[3rem] max-w-[16rem] sm:max-w-[20rem] lg:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle className="space-y-3 text-left">
            <RiDeleteBinLine color="#3377FF" />
            <p>{!isDelete ? "Delete your Account" : "Account Deleted"}</p>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="font-lighter">
            {!isDelete
              ? "This action is permanent and cannot be undone. All your data will be erased"
              : "All your data has been permanently removed. You can contact us if you need any assistance in the future"}
          </p>
          {!isDelete ? (
            <Button className="px-20 py-6" onClick={modalSwitchHandler}>
              Delete
            </Button>
          ) : (
            <DialogClose asChild>
              <Button onClick={modalDeleteHandler} className="px-20 py-6">
                Done
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
