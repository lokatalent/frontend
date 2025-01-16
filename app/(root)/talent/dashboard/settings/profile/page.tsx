"use client"
import React from "react";
import { useSelector } from "react-redux";
import SettingsProfileCard from "@/components/settings/profile/SettingsProfileCard";
import EditModal from "@/components/settings/profile/EditModal";
import { RootStateProfile } from "@/store/profile/profileSlice";
import { RootStateAuth } from "@/store/auth/authSlice";

function Profile() {
     const profileDetails = useSelector(
       (state: RootStateProfile) => state.profile.profileDetails
  );
  const profileInformation = useSelector(
       (state: RootStateProfile) => state.profile.information
  );
  const user = useSelector(
    (state: RootStateAuth) => state.auth.user
  );
  const forms = [
    {
      label: "Full Name",
      text: ` ${user.first_name} ${user.last_name}`,
      type: "text",
    },
    {
      label: "Email",
      text: user.email,
      type: "email",
    },
  ];
  const Phone = [
    {
      label: "Phone Number",
      text: user.phone_num,
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
      text: user.address.length > 0 ? user.address : "-",
      type: "address",
    },
    {
      label: "Country",
      text: "Nigeria",
      type: "country",
    },
    // {
    //   label: "State",
    //   text:  "-",
    //   type: "state",
    // },
    // {
    //   label: "City",
    //   text:  "-",
    //   type: 'city',
    // },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <SettingsProfileCard title="Name and Email" forms={forms} />
        <SettingsProfileCard title="Phone Number" forms={Phone} />
        <SettingsProfileCard title="Address" forms={Address} />
    
      </div>
    </div>
  );
}

export default Profile;
