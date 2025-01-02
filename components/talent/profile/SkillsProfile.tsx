"use client";
import React from "react";

type SkillsProfileProps = {
  skillsSet: {
    bio: string;
    experience: number;
    skillsSet: { [key: string]: boolean };
  };
};

const SkillsProfile: React.FC<SkillsProfileProps> = ({ skillsSet }) => {
  return (
    <div className="card space-y-7">
      <div className="flex items-center justify-between">
        <div className="bg-[#DF86000F] text-[#DF8600] text-sm w-[18rem] p-3 py-5">
          Bio: {skillsSet.bio}
        </div>
        <div>
          <p>Service Radius</p>
          <p>1-4 KM</p>
        </div>
        <div>
          <p>Years of Experience</p>
          <p>{skillsSet.experience} Years</p>
        </div>
        <div>
          <p>Available to Work</p>
          <p>Yes</p>
        </div>
      </div>
      <div>
        <p>Skill Set</p>
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
