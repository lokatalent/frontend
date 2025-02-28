"use client";

import React from "react";
import { useSelector } from "react-redux";
import SettingsProfileCard from "@/components/settings/profile/SettingsProfileCard";;
import { RootStateProfile } from "@/store/profile/profileSlice";
import { RootStateAuth } from "@/store/auth/authSlice";

function ProfileSettings() {
  const profileAuth = useSelector((state: RootStateAuth) => state.auth.user);

  const forms = [
    {
      label: "Full Name",
      text: profileAuth.first_name + " " + profileAuth.last_name,
      type: "text",
    },
    {
      label: "Email",
      text: profileAuth.email,
      type: "email",
    },
  ];

  const Birthday = [
    {
      label: "Date of Birth",
      text: profileAuth.date_of_birth,
      type: "text",
    },
  ];

  const Phone = [
    {
      label: "Phone Number",
      text: profileAuth.phone_num,
      type: "phone",
    },
    {
      label: "Alternate Phone Number",
      text: "-",
      type: "phone1",
    },
  ];
  const Address = [
    {
      label: "Address",
      text: profileAuth?.address?.length > 0 ? profileAuth.address : "-",
      type: "address",
    },
    {
      label: "Country",
      text: "Nigeria",
      type: "country",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <SettingsProfileCard title="Name and Email" forms={forms} />
        <SettingsProfileCard title="Phone Number" forms={Phone} />
        <SettingsProfileCard title="Date of Birth" forms={Birthday} />
        <SettingsProfileCard title="Address" forms={Address} />
      </div>
    </div>
  );
}

export default ProfileSettings;
