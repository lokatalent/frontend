"use client"
import React from "react";
import { useSelector } from "react-redux";
import SettingsProfileCard from "@/components/settings/profile/SettingsProfileCard";
import EditModal from "@/components/settings/profile/EditModal";
import { RootStateProfile } from "@/store/profile/profileSlice";

function Profile() {
     const profileDetails = useSelector(
       (state: RootStateProfile) => state.profile.profileDetails
  );
  const profileInformation = useSelector(
       (state: RootStateProfile) => state.profile.information
     );
  const forms = [
    {
      label: "Full Name",
      text: profileInformation.name,
      type: "text",
    },
    {
      label: "Email",
      text: profileInformation.email,
      type: "email",
    },
  ];
  const Phone = [
    {
      label: "Phone Number",
      text: profileInformation.phoneNumber,
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
      text: profileInformation.address.length > 0 ? profileInformation.address : "-",
      type: "address",
    },
    {
      label: "Country",
      text: "Nigeria",
      type: "country",
    },
    {
      label: "State",
      text: profileInformation.state.length > 0 ? profileInformation.state : "-",
      type: "state",
    },
    {
      label: "City",
      text: profileInformation.city.length > 0 ? profileDetails.city : "-",
      type: 'city',
    },
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
