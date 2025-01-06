"use client";
import { RootStateTalentService } from "@/store/talent/service/TalentServiceSlice";
import React from "react";
import { useSelector } from "react-redux";

type SkillsProfileProps = {
  skillsSet: {
    bio: string;
    experience: number;
    skillsSet: { [key: string]: boolean };
  };
};

const SkillsProfile: React.FC<SkillsProfileProps> = ({ skillsSet }) => {
  const userBio = useSelector((state: any) => state.auth.user.bio);
   const service = useSelector(
     (state: RootStateTalentService) => state.service.service
   );
          // Bio: {
          //   skillsSet.bio;
          // }

  return (
    <div className="card space-y-7">
      <div className="flex sm:items-center items-start flex-col sm:flex-row justify-between">
        <div className="bg-[#DF86000F] text-[#DF8600] text-sm w-full sm:w-[18rem] p-3 py-5">
          Bio: {userBio}
        </div>
        <div className="flex items-center gap-4 sm:block">
          <p>Rate per hour</p>
          <div className="relative block sm:hidden w-[30px] h-[20px]">
            <div className="absolute w-[30px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-[5px] h-[5px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
          {/* <p className="text-[#DF8600]">₦{skillsSet.rate_per_hour}/hr</p> */}
          <div className="flex items-end">
            <div className="text-orange-500 font-bold text-xl">
              ₦{skillsSet.rate_per_hour}
            </div>
            <div className="text-gray-500 font-medium">/hr</div>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:block">
          <p>Years of Experience</p>
          <div className="relative block sm:hidden w-[30px] h-[20px]">
            <div className="absolute w-[30px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-[5px] h-[5px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
          <p>{service.experience_years} Years</p>
        </div>
        <div className="flex items-center gap-4 sm:block">
          <p>Available to Work</p>
          <div className="relative block sm:hidden w-[30px] h-[20px]">
            <div className="absolute w-[30px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-[5px] h-[5px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
          <p>Yes</p>
        </div>
      </div>
      <div className="flex items-cente gap-4 sm:block">
        <p>Skill Set</p>
        <div className="relative block sm:hidden w-[30px] h-[20px]">
          <div className="absolute w-[30px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
          <div className="absolute w-[5px] h-[5px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
        </div>
        <div className="flex flex-wrap space-x-5">
          {Object.entries(skillsSet.skillsSet).map(([skill, isChecked]) => (
            <label key={skill} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isChecked}
                readOnly
                aria-label={skill}
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsProfile;
