"use client";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import EditAvailability from "./edition/EditAvailablity";
interface Availability {
  [key: string]: {
    isActive: boolean;
    from: string;
    to: string;
  };
}

function HoursProfile() {
  const [availability, setAvailability] = useState<Availability>({
    Monday: { isActive: true, from: "09:00", to: "04:00" },
    Tuesday: { isActive: true, from: "10:00", to: "04:00" },
    Wednesday: { isActive: true, from: "10:30", to: "04:00" },
    Thursday: { isActive: true, from: "11:30", to: "04:00" },
    Friday: { isActive: true, from: "09:00", to: "04:00" },
    Saturday: { isActive: false, from: "", to: "" },
    Sunday: { isActive: false, from: "", to: "" },
  });
  const handleSaveAvailability = (updatedAvailability) => {
    console.log(updatedAvailability);
    setAvailability(updatedAvailability);
    // Save the updated availability data to the server or elsewhere
  };
  return (
    <div className="card">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-base font-normal">Available Hours</h2>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center ">
          <EditAvailability
            initialAvailability={availability}
            onSave={handleSaveAvailability}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            M
          </span>
          <span className="font-medium">Mon</span>
          <span className="text-[12px]">
            {availability.Monday.from}PM - {availability.Monday.from} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            T
          </span>
          <span className="font-medium">Tue</span>
          <span className="text-[12px]">
            {availability.Tuesday.from} AM - {availability.Tuesday.to} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            W
          </span>
          <span className="font-medium">Wed</span>
          <span className="text-[12px]">
            {availability.Wednesday.from} AM - {availability.Wednesday.to} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            T
          </span>
          <span className="font-medium">Thur</span>
          <span className="text-[12px]">
            {availability.Thursday.from} AM - {availability.Thursday.to} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            F
          </span>
          <span className="font-medium">Fri</span>
          <span className="text-[12px]">
            {availability.Friday.from} AM - {availability.Friday.to} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            S
          </span>
          <span className="font-medium">Sat</span>
          <span className="text-[12px]">
            {availability.Saturday.from} AM - {availability.Saturday.to} PM
          </span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
            S
          </span>
          <span className="font-medium">Sun</span>
          <span className="text-[12px]">
            {availability.Sunday.from} AM - {availability.Sunday.to} PM
          </span>
        </div>
      </div>
    </div>
  );
}

export default HoursProfile;
