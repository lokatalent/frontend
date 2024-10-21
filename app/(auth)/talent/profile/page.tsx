import ProfileStep from "@/components/home/profile/ProfileStep";
import Form from "@/components/ui/form";
import React from "react";

function Profile() {
  return (
    <div className="flex items-center justify-center flex-col py-16 bg-[#FAF8F4]">
      <h3 className="font-bold text-5xl pb-7">Set up your Profile</h3>
      <div>
        <ProfileStep />
      </div>
    </div>
  );
}

export default Profile;
