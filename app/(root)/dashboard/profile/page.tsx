"use client";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { RootState } from "@/store/profile/profileSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface DataItem {
  title: string;
  value: string;
}

export default async function Profile() {
  const profileDetails = useSelector(
    (state: RootState) => state.profile.profileDetails
  );
  const profilePics = useSelector(
    (state: RootState) => state.profile.profilePics
  );

  // Fetch user profile data from the server
  const data: DataItem[] = [
    {
      title: "Name",
      value: "Gabriel Daramola",
    },
    {
      title: "Email Address",
      value: "Amazingab26@gmail.com",
    },
    {
      title: "Phone Number",
      value: "09123456789",
    },
    {
      title: "Country",
      value: "-",
    },
    {
      title: "State",
      value: profileDetails.state.length > 0 ? profileDetails.state : "-",
    },
    {
      title: "City",
      value: profileDetails.city.length > 0 ? profileDetails.city : "-",
    },
    {
      title: "Address",
      value: profileDetails.address.length > 0 ? profileDetails.address : "-",
    },
  ];
  

  return (
    <div className="ml-8 h-screen sm:ml-0">
      <div className="h-[10rem] mb-24 w-full bg-gradient-to-r to-[#CCD6B0] from-[#6B705C]">
        <div className="bg-white  translate-y-1/2 w-[80%] mx-auto rounded-md p-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[100px] h-[100px] rounded-full">
              {profilePics ? (
                <Image
                  src={profilePics}
                  alt="Profile"
                  layout="fill"
                  className="object-cover rounded-[100px]"
                />
              ) : (
                <Image
                  src="/Images/camera.png"
                  alt="Notification Bing"
                  width={20}
                  height={20}
                />
              )}
              <div className="absolute top-2/4 right-[-10px] flex items-center  justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
                <Image
                  src="/Images/camera-col.png"
                  alt="Notification Bing"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="text-primaryBlue text-2xl font-bold">
              Gabriel Daramola
            </p>
          </div>
        </div>
      </div>

      <ProfileCompletion />

      <div>
        <ProfileDetails details={data} />
      </div>
    </div>
  );
}
