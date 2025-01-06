"use client";
import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormFieldError } from "@/components/ui/form/FormFieldError";

type TimeValue = string | "--:--";

interface DayAvailability {
  isActive: boolean;
  from: TimeValue;
  to: TimeValue;
}

interface Availability {
  [key: string]: DayAvailability;
}

interface EditAvailabilityProps {
  initialAvailability: Availability;
  onSave: (availability: Availability) => void;
  trigger?: boolean;
}

const DEFAULT_TIME = "--:--";
const REPEAT_OPTIONS = ["Weekly", "Monthly"];

const EditAvailability: React.FC<EditAvailabilityProps> = ({
  initialAvailability,
  trigger,
  onSave,
}) => {
  const [availability, setAvailability] =
    useState<Availability>(initialAvailability);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  const validateTimes = (data: Availability): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    Object.entries(data).forEach(([day, dayData]) => {
      if (dayData.isActive) {
        if (dayData.from === DEFAULT_TIME || !dayData.from) {
          newErrors[`${day}-from`] = "Start time is required";
        }
        if (dayData.to === DEFAULT_TIME || !dayData.to) {
          newErrors[`${day}-to`] = "End time is required";
        }
        if (dayData.from && dayData.to && dayData.from >= dayData.to) {
          newErrors[`${day}-range`] = "End time must be after start time";
        }
      }
    });

    return newErrors;
  };

  const handleToggleDay = (day: string) => {
    setAvailability((prev) => {
      const newState = {
        ...prev,
        [day]: {
          ...prev[day],
          isActive: !prev[day].isActive,
          from: !prev[day].isActive ? prev[day].from : DEFAULT_TIME,
          to: !prev[day].isActive ? prev[day].to : DEFAULT_TIME,
        },
      };

      // Clear errors when deactivating a day
      if (!newState[day].isActive) {
        const newErrors = { ...errors };
        delete newErrors[`${day}-from`];
        delete newErrors[`${day}-to`];
        delete newErrors[`${day}-range`];
        setErrors(newErrors);
      }

      return newState;
    });
  };

  const handleTimeChange = (
    day: string,
    field: "from" | "to",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));

    // Clear specific error when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${day}-${field}`];
      delete newErrors[`${day}-range`];
      return newErrors;
    });
  };

  const handleDone = () => {
    const newErrors = validateTimes(availability);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(availability);
      setIsOpen(false);
    }
  };

  const TimeInput = ({
    day,
    field,
    value,
    disabled,
  }: {
    day: string;
    field: "from" | "to";
    value: TimeValue;
    disabled: boolean;
  }) => (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center justify-evenly w-full rounded-md border 
        ${
          errors[`${day}-${field}`] || errors[`${day}-range`]
            ? "border-red-500"
            : "border-gray-300"
        } 
        ${disabled ? "bg-gray-100" : ""}`}
      >
        <span className="text-sm text-gray-500">
          {field === "from" ? "From" : "To"}
        </span>
        <input
          type="time"
          value={value === DEFAULT_TIME ? "" : value}
          onChange={(e) => handleTimeChange(day, field, e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-2 outline-none bg-transparent"
          required={!disabled}
        />
      </div>
      {errors[`${day}-${field}`] && (
        // <span className="text-xs text-red-500 mt-1">
        //   {errors[`${day}-${field}`]}
        // </span>
        <FormFieldError error={{ message: errors[`${day}-${field}`] }} />
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
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

        <div className="space-y-4">
          {Object.entries(availability).map(([day, dayData]) => (
            <div
              key={day}
              className="flex flex-col sm:flex-col sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 py-2 px-4"
            >
              <div className="flex flex-row sm:items-cente  ustify-between w-full">
                <div className="flex items-center space-x-4">
                  <div className="relative inline-block w-12 h-6">
                    <div
                      className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-200 
                      ${dayData.isActive ? "bg-blue-500" : "bg-gray-300"}`}
                      onClick={() => handleToggleDay(day)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 
                        ${
                          dayData.isActive ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium w-20">{day}</span>
                </div>

                {dayData.isActive ? (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
                    <TimeInput
                      day={day}
                      field="from"
                      value={dayData.from}
                      disabled={!dayData.isActive}
                    />
                    <TimeInput
                      day={day}
                      field="to"
                      value={dayData.to}
                      disabled={!dayData.isActive}
                    />
                  </div>
                ) : (
                  <div className="flex-1 py-2 px-4 bg-gray-100 text-gray-500 rounded-md">
                    Closed
                  </div>
                )}
              </div>

              {errors[`${day}-range`] && (
                // <div className="text-xs text-blue-500 mt-1 block">
                //   {errors[`${day}-range`]}
                // </div>
                <div className=''>
                  <FormFieldError error={{ message: errors[`${day}-range`] }} />
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3 my-4">
            <p>Available to work now</p>
            <div className="flex items-center space-x-4">
              {["Yes", "No"].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`available-${option.toLowerCase()}`}
                    type="radio"
                    name="available-to-work"
                    value={option.toLowerCase()}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`available-${option.toLowerCase()}`}
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Repeat (Optional)
            </label>
            <select className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-sm transition-colors">
              {REPEAT_OPTIONS.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bold leading-none hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px]"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvailability;

