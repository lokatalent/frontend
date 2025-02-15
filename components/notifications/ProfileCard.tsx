"use client";
import React from "react";
import { Avatar } from "../ui/avatar";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BookingStatus, UserServiceRole } from "@/lib/constants";

interface ProfileCardProps {
  name: string;
  occupation: string;
  location: string;
  status: string;
  avatar: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  occupation,
  location,
  status,
  avatar,
}) => {
  const currentUserServiceRole = useSelector((state: any) => state.auth.user.service_role);
  return (
    <div className="flex md:items-center flex-col md:flex-row justify-between space-x-4 gap-x-20">
      <div className="grid grid-cols-4 md:grid-cols-12  md:items-center items-start space-x-2 md:space-x-6">
        <div className="col-span-2 md:col-span-5 lg:col-span-3 flex flex-col md:flex-row md:items-center space-x-2 space-y-2">
          <div className="flex-shrink-0">
            <Avatar
              src={avatar || "/Images/camera.png"}
              alt="User Avatar"
              color="bg-blue-500"
              radius="rounded-full"
              fallback="JC"
              height={40}
              width={90}
              className="w-16 h-16"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-gray-500">{occupation}</p>
            <div className="text-black text-sm flex items-center space-x-1 ">
              <IoLocationOutline />
              <p>{location}</p>
            </div>
          </div>
        </div>
        {getBookingStatus(status, currentUserServiceRole)}
      </div>
    </div>
  );
};

function getBookingStatus(bookingStatus: string, role: string) {
  let statusColor1 = "";
  let statusColor2 = "";
  let imgSrc = "";
  let statusText = "";
  switch (bookingStatus) {
    case BookingStatus.BOOKING_OPEN:
      {
        imgSrc = "/Images/copy-success.png";
        statusColor1 = "bg-yellow-500";
        statusColor2 = "text-yellow-500";
        if (role === UserServiceRole.SERVICE_ROLE_PROVIDER) {
          statusText = "This booking is currently open to talents.";
        } else {
          statusText = "Your booking has been created successfully and awaiting talent to accept.";
        }
      }
      break;
    case BookingStatus.BOOKING_COMPLETED:
      {
        imgSrc = "/Images/complete-icon.png";
        statusColor1 = "bg-green-500";
        statusColor2 = "text-green-500";
        if (role === UserServiceRole.SERVICE_ROLE_PROVIDER) {
          statusText = "This booking has been marked as completed by the requester.";
        } else {
          statusText = "Mark this job as complete once the service is finished to release payment to the talent";
        }
      }
      break;
    case BookingStatus.BOOKING_CANCELED:
      {
        imgSrc = "/Images/cancel-icon.png";
        statusColor1 = "bg-red-500";
        statusColor2 = "text-red-500";
        if (role === UserServiceRole.SERVICE_ROLE_PROVIDER) {
          statusText = "This booking has been cancelled by the requester.";
        } else {
          statusText = "You have cancelled this booking.";
        }
      }
      break;
    default:
      {
        imgSrc = "/Images/pending-icon.png";
        statusColor1 = "bg-gray-400";
        statusColor2 = "text-gray-400";
        if (role === UserServiceRole.SERVICE_ROLE_PROVIDER) {
          statusText = "This booking is awaiting completion confirmation from the requester.";
        } else {
          statusText = "Mark this job as complete once the service is finished to release payment to the talent";
        }
      }
  }
  return (
    <div className=" col-span-2 md:col-span-6 flex space-x-3  items-center m-0">
      <div>
        <div className="p-2 rounded-full bg-white shadow-lg">
          <Image
            src={imgSrc}
            alt="Booking Status"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="flex items-center flex-col justify-center md:mt-4 sm:mt-4">
        <div className="self-start">
          <span
            className={`w-2 h-2 rounded-full text-left ${
              statusColor1
            }`}
          ></span>
          <p
            className={`md:text-xl font-bold ${
              statusColor2
            }`}
          >
            {bookingStatus}
          </p>
        </div>
        <p className="text-textGray3 text-sm w-full md:w-2/3 self-start mt-2">
          {statusText}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
