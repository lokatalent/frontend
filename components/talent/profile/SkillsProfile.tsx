"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type SkillSetProps = {
  skills: { [key: string]: boolean };
  onSkillChange: (skill: string, value: boolean) => void;
  skillsSet: any;
};

const SkillsProfile: React.FC<SkillSetProps> = ({ skillsSet }) => {
  console.log(skillsSet);

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
      <div className="flex space-x-5">
        <p>Skill Set</p>
        {Object.entries(skillsSet.skillsSet).map(([skill, isChecked]) => (
          <div key={skill} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isChecked}
              readOnly
            />
            <span>{skill}</span>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default SkillsProfile;
