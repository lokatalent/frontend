import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function SkillsProfile() {
  return (
    <div className="card space-y-7">
      <div className="flex items-center justify-between">
        <div className="bg-[#DF86000F] text-[#DF8600] text-sm w-[18rem] p-3 py-5">
          Bio: I am a cleaner with experience of over two years and a dedicated
          person
        </div>
        <div>
          <p>Service Radius</p>
          <p>1-4 KM</p>
        </div>
        <div>
          <p>Years of Experience</p>
          <p>2 Years</p>
        </div>
        <div>
          <p>Available to Work</p>
          <p>Yes</p>
        </div>
      </div>
      <div className="flex space-x-5">
        <p>Skill Set</p>
        <div className="flex items-center space-x-3">
          <FaCheckCircle color="#DF8600" />
          <p className="text-sm">Washing</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCheckCircle color="#DF8600" />
          <p className="text-sm">Washing</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCheckCircle color="#DF8600" />
          <p className="text-sm">Washing</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCheckCircle color="#DF8600" />
          <p className="text-sm">Washing</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCheckCircle color="#DF8600" />
          <p className="text-sm">Washing</p>
        </div>
      </div>
    </div>
  );
}

export default SkillsProfile;
