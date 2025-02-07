"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { DivideSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoggedin } from "@/store/auth/authSlice";
import { Avatar } from "../ui/avatar";
import Image from "next/image";

const Menu: React.FC<{ username: string }> = ({ username }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const avatar = useSelector((state: any) => state.auth.user.avatar);
  const userServiceRole = useSelector((state: any) => state.auth.user.service_role);
  console.log(userServiceRole);
  const logout = () => {
    dispatch(setLoggedin(false));
    sessionStorage.removeItem("lokaToken");
    router.push("/login");
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center space-x-2 hover:bg-gray-100 target:bg-gray-100 rounded-md p-1">
          {!avatar ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              {username.charAt(0)}
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              <div className="relative shrink-0 w-10 h-10 rounded-full">
                <Image
                  src={avatar}
                  alt="My Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          )}

          <p className="hidden md:block">{username}</p>
          <MdKeyboardArrowDown size={20} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="bg-white shadow-lg mt-4 rounded-lg">
        <div className="">
          <Link
            href={userServiceRole === "service_provider" ? "/talent/dashboard/profile" : "/dashboard/profile"}
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <FaRegUser size={20} />
            <p>Profile</p>
          </Link>
          <Link
            href={userServiceRole === "service_provider"? "/talent/dashboard/settings/profile" : "/dashboard/settings/profile"}
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200"
          >
            <IoSettingsOutline size={20} />
            <p>Settings</p>
          </Link>
          <div
            onClick={logout}
            className="flex p-2 pl-8 py-3 space-x-4 items-center hover:bg-gray-200 rounded-bl-lg rounded-br-lg"
          >
            <HiOutlineLogout size={20} />
            <p>Logout</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
