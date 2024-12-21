"use client";
import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Menu: React.FC<{ username: string }> = ({ username }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center space-x-2 hover:bg-gray-100 target:bg-gray-100 rounded-md p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            {username.charAt(0)}
          </div>
          <p className="">{username}</p>
          <MdKeyboardArrowDown size={20} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[12rem] bg-white shadow-lg mt-4 rounded-lg">
        <div className="">
          <Link
            href="/dashboard/profile"
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <FaRegUser size={20} />
            <p>Profile</p>
          </Link>
          <Link
            href="/dashboard/settings/profile"
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200"
          >
            <IoSettingsOutline size={20} />
            <p>Settings</p>
          </Link>
          <Link
            href="/dashboard/logout"
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200 rounded-bl-lg rounded-br-lg"
          >
            <HiOutlineLogout size={20} />
            <p>Logout</p>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
