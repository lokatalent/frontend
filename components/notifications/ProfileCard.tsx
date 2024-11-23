import React from "react";
import { Avatar } from "../ui/avatar";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  occupation: string;
  location: string;
  status: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  occupation,
  location,
  status,
}) => {
  return (
    <div className="flex md:items-center flex-col md:flex-row justify-between pace-x-4 gap-x-20">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <Avatar
            src="/Images/dp.png"
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
      <div className="flex space-x-3  items-center">
        <div>
          <div className="p-2 rounded-full bg-white shadow-lg">
            <Image
              src="/Images/copy-success.png"
              alt="Copy success"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex items-center flex-col justify-center mt-4 sm:mt-4">
          <div className="self-start">
            <span
              className={`w-2 h-2 rounded-full text-left ${
                status === "Booking Accepted" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <p
              className={`text-2xl font-bold ${
                status === "Booking Accepted"
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {status}
            </p>
          </div>
          <p className="text-textGray3 text-sm w-2/3 self-start mt-2">
            Mark this job as complete once the service is finished to release
            payment to the talent
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
