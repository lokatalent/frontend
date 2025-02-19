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
   console.log(service.service_type)
          // Bio: {
          //   skillsSet.bio;
          // }

  return (
    <div className="card space-y-7 p-5 border rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="bg-[#DF86000F] text-[#DF8600] text-sm w-full sm:w-[18rem] p-3 py-5 rounded-lg">
          Bio: {userBio}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full sm:w-auto text-left sm:text-center">
          <div className="flex flex-col items-start sm:items-center gap-2">
            <p className="text-gray-600 font-medium">Rate per hour</p>
            <div className="flex items-end text-xl font-bold text-orange-500">
              ₦{service.rate_per_hour}
              <span className="text-gray-500 text-sm font-medium">/hr</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-center gap-2">
            <p className="text-gray-600 font-medium">Years of Experience</p>
            <p className="text-lg font-bold">{service.experience_years || 0}</p>
          </div>
          <div className="flex flex-col items-start sm:items-center gap-2">
            <p className="text-gray-600 font-medium">Available to Work</p>
            <p className="test-lg font-bold text-green-600">Yes</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:items-center gap-4">
        <p className="text-gray-600 font-medium">Skill Set</p>
        <div className="flex flex-wrap gap-3">
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
