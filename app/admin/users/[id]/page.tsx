"use client";

import React, { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoReceiptOutline, IoWalletOutline } from "react-icons/io5";
import PageSpinner from "@/components/ui/PageSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { getProfile } from "@/services/profileService";
import {
  handleUnauthorizedError,
  formatDateTime,
  transformSnakeCase,
} from "@/lib/utils";

const UserDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const profileResp = await getProfile(params.id);
    if (!profileResp.error) {
      setProfile(profileResp.data);
      setLoading(false);
    } else {
      setLoading(false);
      handleUnauthorizedError(profileResp, dispatch, router, showToast);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

	return (
    loading ? (
      <PageSpinner />
    ) : (
      <div className="py-14">
        <div className="flex flex-row space-x-3 items-center">
          <Link href="/admin/users">
            <IoIosArrowRoundBack size={24} />
          </Link>
          <p className="text-2xl font-semibold">User Details</p>
        </div>
        <div className="card my-5">
          <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 justify-between">
            <div className="bg-yellow/50 px-4 py-2 rounded-full max-w-[300px]">
              <p className="text-center">{transformSnakeCase(profile?.service_role)}</p>
            </div>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update User Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="admin_super">Super Admin</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-[1.5rem] items-center my-8">
            <div className="w-[90px] h-[90px]">
              <Image
                src={profile?.avatar || "/Images/camera.png"}
                alt=""
                className="w-full h-full object-cover"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h4>{`${profile?.first_name} ${profile?.last_name}`}</h4>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-[7px] w-[7px] rounded-[100%] bg-[#115F04]"></div>
                {transformSnakeCase(profile?.role)}
              </div>
            </div>
          </div>

          <div className="flex space-x-12 my-8">
            <div>
              <h4 className="text-[12px] text-[#212121B2]">EMAIL</h4>
              <p className="mt-2 flex items-center">{profile?.email}</p>
            </div>
            <div>
              <h4 className="text-[12px] text-[#212121B2]">COUNTRY</h4>
              <p className="mt-2 flex items-center">Nigeria</p>
            </div>
            <div>
              <h4 className="text-[12px] text-[#212121B2]">PHONE</h4>
              <p className="mt-2 flex items-center">{profile?.phone_num}</p>
            </div>
            <div></div>
          </div>
          <div className="flex space-x-12 my-8">
            <div>
              <h4 className="text-[12px] text-[#212121B2]">REGISTRATION DATE</h4>
              <p className="mt-2 flex items-center">{formatDateTime(profile?.created_at)}</p>
            </div>
            <div>
              <h4 className="text-[12px] text-[#212121B2]">LAST LOGIN</h4>
              <p className="mt-2 flex items-center">
                {formatDateTime(profile?.last_login)}
              </p>
            </div>
          </div>

          <Button className="px-4 py-3 flex items-center justify-center  rounded-md text-sm font-medium bg-primaryBlue">
            Update Profile Details
          </Button>
        </div>

        <div className="card2 my-5">
          <div className="flex space-x-3 items-center">
            <div
              className="w-12 h-12 rounded-lg bg-orange-300 flex items-center justify-center"
            >
              <IoReceiptOutline color="#fff" />
            </div>
            <p> Bookings</p>
          </div>
        </div>
        <div className="card2 my-5">
          <div className="flex space-x-3 items-center">
          <div
              className="w-12 h-12 rounded-lg bg-orange-300 flex items-center justify-center"
            >
              <IoIosTimer color="#fff" size={25}/>
            </div>
            
            <p> User Activities</p>
          </div>
        </div>
        <div className="card2 my-5">
          <div className="flex space-x-3 items-center">
          <div className="w-12 h-12 rounded-lg bg-orange-300 flex items-center justify-center">
              <IoWalletOutline color="#fff" />
          </div>
            
            <p> Transactions</p>
          </div>
        </div>
      </div>
    )
	);
};

export default UserDetails;
