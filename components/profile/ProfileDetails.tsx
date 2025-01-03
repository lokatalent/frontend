"use client";

import { signin } from "@/services/authService";
import { getOwnProfile } from "@/services/profileService";
import React, { useEffect } from "react";

interface DataItem {
  title: string;
  value: string;
}

// Define the props interface
interface ProfileDetailsProps {
  details: DataItem[]; // Specify that details is an array of DataItem
}

function ProfileDetails({ details }: ProfileDetailsProps) {
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       if (typeof window === "undefined") return; // Ensure this only runs on the client

  //       const token = sessionStorage.getItem("lokaToken");
  //       console.log("Token:", token);

  //       const credentials = {
  //         email: "apalara@gmail.com",
  //         password: "123456789",
  //       };

  //       const response = await signin(credentials);
  //       console.log("Signin response:", response);

  //       const profile = await getOwnProfile();
  //       console.log("Profile:", profile);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

    // fetchProfile();
  // }, []);

  return (
    <div className="card md:!px-6 my-5 flex flex-col gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:gap-y-10 md:gap-x-0">
        {details.map((profile) => (
          <div key={profile.title}>
            {" "}
            {/* Ensure title is unique */}
            <h4 className="text-[12px] text-[#212121B2]">{profile.title}</h4>
            <p className="mt-2 flex items-center">{profile.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDetails;
