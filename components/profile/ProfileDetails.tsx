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
  return (
    <div className="card md:!px-6 my-5 flex flex-col gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {details.map((profile) => (
          <div key={profile.title}>
            {" "}
            {/* Ensure title is unique */}
            <h4 className="text-[12px] text-[#212121B2]">{profile.title}</h4>
            <p className="mt-2 flex items-center capitalize text-sm">{profile.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDetails;
