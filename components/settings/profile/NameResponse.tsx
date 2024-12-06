// components/UserProfile.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setNameResponseModal } from "@/store/settings/SettingsSlice";

interface ResponseProps {
  open: boolean;
  onOpenChange: () => void;
}

const NameResponse: React.FC<ResponseProps> = ({ open, onOpenChange }) => {
  const nameResponseModal = useSelector((state: RootState) => state.settings.nameResponseModal);
  const dispatch = useDispatch();


  return (
    <>
      <Dialog open={nameResponseModal} onOpenChange={onOpenChange}>
        <DialogContent>
          {/* <div className="flex justify-center items-center "> */}
          <div className="flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-l w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Response Submitted</h2>
              <p className="text-gray-600 mb-6">
                We will get back to you within 24 hours to let you know the
                update on your response. Thank you.
              </p>  
              <DialogClose asChild>
              <button onClick={() => dispatch(setNameResponseModal(false))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Done
              </button>
              </DialogClose>
               
            </div>
          </div>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NameResponse;
