"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "@/components/settings/delete-account/DeleteModal";
import { MdOutlineInfo } from "react-icons/md";

function DeleteAccount() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex space-x-8 items-center ">
        <p className="text-xl">Delete Account</p>
        <MdOutlineInfo size={20}/>
      </div>
      <p className="text-base w-full sm:w-4/5">
        By deleting your account, all your data, bookings, and preferences will
        be permanently removed from our system. Please note that this action is
        irreversible and cannot be undone
      </p>
      <div className="flx">
        <DeleteModal />
      </div>
    </div>
  );
}

export default DeleteAccount;
