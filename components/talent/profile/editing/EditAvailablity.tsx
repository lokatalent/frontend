"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";

interface Availability {
  [key: string]: {
    isActive: boolean;
    from: string;
    to: string;
  };
}

interface EditAvailabilityProps {
  initialAvailability: Availability;
  onSave: (availability: Availability) => void;
  trigger?: boolean;
}

const EditAvailability: React.FC<EditAvailabilityProps> = ({
  initialAvailability,
  trigger,
  onSave,
}) => {
  const [availability, setAvailability] =
    useState<Availability>(initialAvailability);
  const [isDirty, setIsDirty] = useState(false);

  const handleToggleDay = (day: string) => {
    setIsDirty(true);
    setAvailability((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], isActive: !prevState[day].isActive },
    }));
  };

  const handleTimeChange = (
    day: string,
    field: "from" | "to",
    value: string
  ) => {
    setIsDirty(true);
    setAvailability((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], [field]: value },
    }));
  };

  const handleDone = () => {
    setIsDirty(false);
    onSave(availability);
  };

  const options = ["Weekly", "Monthly"];

  return (
    <Dialog>
      <DialogTrigger>
        {trigger ? (
          <p className="underline">Set Availability*</p>
        ) : (
          <FaPen color="#3377FF" size={10} />
        )}
      </DialogTrigger>

      <DialogContent className="w-full p-[3rem] max-w-[22rem] sm:max-w-[30rem] lg:max-w-[40rem] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Availability</DialogTitle>
          <p className="text-[14px] text-center text-[#6C727F]">
            You will still be able to edit your availability in your profile
          </p>
          <p className="text-[14px] text-center text-[#6C727F]">
            Jobs will be strictly allocated to you based on your available time
          </p>
        </DialogHeader>
        <div className="">
          <div className="">
            {Object.keys(availability).map((day) => (
              <div
                key={day}
                className="flex items-center justify-between space-x-[7rem] py-2 px-4"
              >
                {/* Day and Toggle */}
                <div className="flex items-center w-[5rem] space-x-4">
                  {/* Toggle Switch */}
                  <div className="relative inline-block w-12 h-6">
                    <div
                      className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-200 ${
                        availability[day].isActive
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleToggleDay(day)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          availability[day].isActive
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                  {/* Day Label */}
                  <label htmlFor={day} className="text-gray-700 font-medium">
                    {day}
                  </label>
                </div>

                {/* Time Inputs or Closed Message */}
                {availability[day].isActive ? (
                  <div className="flex items-center justify-between w-full max-w-lg space-x-6">
                    {/* From Time Input */}
                    <div className="flex items-center justify-evenly w-full rounded-md  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span className="text-sm text-gray-500  ">From</span>
                      <input
                        type="time"
                        value={availability[day].from}
                        onChange={(e) =>
                          handleTimeChange(day, "from", e.target.value)
                        }
                        className="w-ful px-3 py-2 outline-none"
                      />
                    </div>
                    {/* To Time Input */}
                    <div className="flex items-center justify-evenly w-full rounded-md  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <label className="text-sm text-gray-500 ">To</label>
                      <input
                        type="time"
                        value={availability[day].to}
                        onChange={(e) =>
                          handleTimeChange(day, "to", e.target.value)
                        }
                        className="w-ful px-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-lg py-2 px-4 bg-gray-100 text-gray-500 rounded-md">
                    Closed
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 my-4">
            <p>Available to work now</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <input
                  id="available-yes"
                  type="radio"
                  name="available-to-work"
                  value="yes"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="available-yes"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="available-no"
                  type="radio"
                  name="available-to-work"
                  value="no"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="available-no"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium mb-2"
              >
                Repeat(Optional)
              </label>
              <select
                id="bankName"
                name="bankName"
                onChange={(e) => console.log(e.target.value)}
                className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-sm transition-colors "
              >
                {options.map((option) => (
                  <option
                    value={option}
                    key={option}
                    className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px]"
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <DialogClose asChild>
              <button
                className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                onClick={handleDone}
              >
                Done
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvailability;
