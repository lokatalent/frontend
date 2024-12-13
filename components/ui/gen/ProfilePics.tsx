import Image from "next/image";
import React from "react";

interface ProfilePicsProps {
  isProfile?: string; // Optional, can be null or undefined
  isEdit?: boolean
}

const ProfilePics: React.FC<ProfilePicsProps> = ({ isProfile, isEdit }) => {
  return (
    <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[100px] h-[100px] rounded-full">
      {isProfile ? (
        <Image
          src={isProfile}
          alt="Profile"
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <Image
          src="/Images/camera.png"
          alt="Placeholder Camera"
          width={20}
          height={20}
        />
      )}
      {isEdit && <div className="absolute top-1/2 right-[-10px] flex items-center justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full transform -translate-y-1/2">
        <Image
          src="/Images/camera-col.png"
          alt="Camera Icon"
          width={20}
          height={20}
        />
      </div>}
    </div>
  );
};

export default ProfilePics;
