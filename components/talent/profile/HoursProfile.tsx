import React from "react";
import { FaPen } from "react-icons/fa";

function HoursProfile() {
  return (
    <div className="card">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-base font-normal">Available Hours</h2>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center ">
          <FaPen color="#3377FF" size={10} />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            M
          </span>
          <span className="font-medium">Mon</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            T
          </span>
          <span className="font-medium">Tue</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            W
          </span>
          <span className="font-medium">Wed</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            T
          </span>
          <span className="font-medium">Thur</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            F
          </span>
          <span className="font-medium">Fri</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            S
          </span>
          <span className="font-medium">Sat</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            S
          </span>
          <span className="font-medium">Sun</span>
          <span className="text-[12px]">9:00 AM - 4:00 PM</span>
        </div>
      </div>
    </div>
  );
}

export default HoursProfile;
