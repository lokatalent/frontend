"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootStateTalentService,
  setService,
} from "@/store/talent/service/TalentServiceSlice";
import { getAllService, updateService } from "@/services/services";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import EditAvailability from "./editing/EditAvailablity";
import { RootStateProfile } from "@/store/profile/profileSlice";
import { RootStateTalentProfileState } from "@/store/talent/profile/TalentProfileSlice";
import { RootStateAuth } from "@/store/auth/authSlice";

// type DayOfWeek =
//   | "Monday"
//   | "Tuesday"
//   | "Wednesday"
//   | "Thursday"
//   | "Friday"
//   | "Saturday"
//   | "Sunday";
type TimeSlot = { start: string; end: string };

interface DayAvailability {
  isActive: boolean;
  from: string;
  to: string;
}

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface DayAvailability {
  isActive: boolean;
  from: string;
  to: string;
}
interface Availability {
  [key: string]: DayAvailability;
}

interface ServiceAvailability {
  [key: string]: TimeSlot;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_ABBREVIATIONS: Record<DayOfWeek, string> = {
  Monday: "M",
  Tuesday: "T",
  Wednesday: "W",
  Thursday: "T",
  Friday: "F",
  Saturday: "S",
  Sunday: "S",
};

const DayDisplay = ({
  day,
  abbreviation,
  availability,
}: {
  day: DayOfWeek;
  abbreviation: string;
  availability: DayAvailability;
}) => (
  <div className="flex flex-col items-center space-y-3">
    <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
      {abbreviation}
    </span>
    <span className="font-medium">{day.slice(0, 3)}</span>
    <span className="text-[12px]">
      {availability.from}AM - {availability.to}PM
    </span>
  </div>
);

function HoursProfile() {
  const dispatch = useDispatch();
  const service = useSelector(
    (state: RootStateTalentService) => state.service.service
  );
  const userID = useSelector((state: RootStateAuth) => state.auth.user.id);

  const mapServiceToAvailability = (serviceData: any): Availability => {
    return DAYS_OF_WEEK.reduce((acc, day) => {
      const lowercase = day.toLowerCase();
      return {
        ...acc,
        [day]: {
          isActive: true,
          from: serviceData.availability[lowercase]?.start || "--:--",
          to: serviceData.availability[lowercase]?.end || "--:--",
        },
      };
    }, {} as Availability);
  };

  const [availability, setAvailability] = useState<Availability>(
    mapServiceToAvailability(service)
  );

  const mapAvailabilityToService = (
    availabilityData: Availability
  ): ServiceAvailability => {
    return DAYS_OF_WEEK.reduce((acc, day) => {
      return {
        ...acc,
        [day.toLowerCase()]: {
          start: availabilityData[day].from,
          end: availabilityData[day].to,
        },
      };
    }, {} as ServiceAvailability);
  };

  const handleSaveAvailability = async (updatedAvailability: Availability) => {
    try {
      // setAvailability(updatedAvailability);
      const response1 = await getAllService(userID);
      // if (response1?.data || response1.data.length > 0) {
      if (!response1?.data || response1.data.length === 0) {
        // dispatch(
        //   setService({
        //     experience_years: "",
        //     service_type: "",
        //     service_desc: "",
        //     rate_per_hour: 0,
        //     availability: {
        //       monday: {
        //         start: "",
        //         end: "",
        //       },
        //       tuesday: {
        //         start: "",
        //         end: "",
        //       },
        //       wednesday: {
        //         start: "",
        //         end: "",
        //       },
        //       thursday: {
        //         start: "",
        //         end: "",
        //       },
        //       friday: {
        //         start: "",
        //         end: "",
        //       },
        //       saturday: {
        //         start: "",
        //         end: "",
        //       },
        //       sunday: {
        //         start: "",
        //         end: "",
        //       },
        //     },
        //     address: "",
        //   })
        // );
        dispatch(showToast({
          status: "error",
          message: "No services found for the user.",
        }));
        return;
      }

      const updatedService = {
        experience_years: service.experience_years,
        service_type: service.service_type,
        service_desc: service.service_desc,
        rate_per_hour: service.rate_per_hour,
        address: service.address,
        availability: mapAvailabilityToService(updatedAvailability),
      };
      const response = await updateService(updatedService);
      if (response.status === 200) {
        dispatch(setService(response.data));
        dispatch(
          showToast({
            status: "success",
            message: "Availability updated successfully",
          })
        );
      } else {
        throw new Error(errorHandler(response.data));
      }
      // }
    } catch (error) {
      dispatch(
        showToast({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to update availability",
        })
      );
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-base font-normal">Available Hours</h2>
        <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center">
          <EditAvailability
            initialAvailability={availability}
            onSave={handleSaveAvailability}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center  sm:grid sm:grid-cols-7 gap-4">
        {DAYS_OF_WEEK.map((day) => (
          <DayDisplay
            key={day}
            day={day}
            abbreviation={DAY_ABBREVIATIONS[day]}
            availability={availability[day]}
          />
        ))}
      </div>
    </div>
  );
}

export default HoursProfile;

// "use client";
// import React, { useEffect, useState } from "react";
// import { FaPen } from "react-icons/fa";
// import EditAvailability from "./editing/EditAvailablity";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   RootStateTalentService,
//   setService,
// } from "@/store/talent/service/TalentServiceSlice";
// import { updateService } from "@/services/services";
// import { showToast } from "@/store/auth/toastSlice";
// import { errorHandler } from "@/lib/utils";

// interface Availability {
//   [key: string]: {
//     isActive: boolean;
//     from: string;
//     to: string;
//   };
// }

// function HoursProfile() {
//   const service = useSelector(
//     (state: RootStateTalentService) => state.service.service
//   );

//   console.log(service)

//   const initialAvailability = {
//     Monday: {
//       isActive: true,
//       from: service.availability.monday.start,
//       to: service.availability.monday.end,
//     },
//     Tuesday: {
//       isActive: true,
//       from: service.availability.tuesday.start,
//       to: service.availability.tuesday.end,
//     },
//     Wednesday: {
//       isActive: false,
//       from: service.availability.wednesday.start,
//       to: service.availability.wednesday.start,
//     },
//     Thursday: {
//       isActive: true,
//       from: service.availability.thursday.start,
//       to: service.availability.thursday.end,
//     },
//     Friday: {
//       isActive: true,
//       from: service.availability.friday.start,
//       to: service.availability.friday.end,
//     },
//     Saturday: {
//       isActive: false,
//       from: service.availability.saturday.start,
//       to: service.availability.saturday.end,
//     },
//     Sunday: {
//       isActive: false,
//       from: service.availability.sunday.start,
//       to: service.availability.sunday.end,
//     },
//   };

//   // State to manage availability
//   const [availability, setAvailability] = useState(initialAvailability);
//   const dispatch = useDispatch();
//   const handleSaveAvailability = (
//     updatedAvailability: typeof initialAvailability
//   ) => {
//     console.log(updatedAvailability);
//     setAvailability(updatedAvailability);

//     useEffect(() => {
//       async function availabilityHandler() {

//         let temp = {
//           experience_years: service.experience_years,
//           service_type: service.service_type,
//           service_desc: service.service_desc,
//           rate_per_hour: service.rate_per_hour,
//           address: service.address,
//           availablity: {
//             monday: {
//               start: updatedAvailability.Monday.from,
//               end: updatedAvailability.Monday.to,
//             },
//             tuesday: {
//               start: updatedAvailability.Tuesday.from,
//               end: updatedAvailability.Tuesday.to,
//             },
//             wednesday: {
//               start: updatedAvailability.Wednesday.from,
//               end: updatedAvailability.Wednesday.to,
//             },
//             thursday: {
//               start: updatedAvailability.Thursday.from,
//               end: updatedAvailability.Thursday.to,
//             },
//             friday: {
//               start: updatedAvailability.Friday.from,
//               end: updatedAvailability.Friday.to,
//             },
//             saturday: {
//               start: updatedAvailability.Saturday.from,
//               end: updatedAvailability.Saturday.to,
//             },
//             sunday: {
//               start: updatedAvailability.Sunday.from,
//               end: updatedAvailability.Sunday.to,
//             },
//           },
//         };
//         const response = await updateService(temp);
//         console.log(response);
//         if (response.status === 200) {
//           console.log(response.data);
//           dispatch(setService(response.data));
//         } else {
//           dispatch(
//             showToast({
//               status: "error",
//               message: errorHandler(response.data),
//             })
//           );
//         }
//       }
//       // Save the updated availability data to the server or elsewhere
//       availabilityHandler();
//     })
//   };
//   return (
//     <div className="card">
//       <div className="flex justify-between mb-6 items-center">
//         <h2 className="text-base font-normal">Available Hours</h2>
//         <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center ">
//           <EditAvailability
//             initialAvailability={availability}
//             onSave={handleSaveAvailability}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-7 gap-4">
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             M
//           </span>
//           <span className="font-medium">Mon</span>
//           <span className="text-[12px]">
//             {availability.Monday.from}PM - {availability.Monday.from} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             T
//           </span>
//           <span className="font-medium">Tue</span>
//           <span className="text-[12px]">
//             {availability.Tuesday.from} AM - {availability.Tuesday.to} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             W
//           </span>
//           <span className="font-medium">Wed</span>
//           <span className="text-[12px]">
//             {availability.Wednesday.from} AM - {availability.Wednesday.to} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             T
//           </span>
//           <span className="font-medium">Thur</span>
//           <span className="text-[12px]">
//             {availability.Thursday.from} AM - {availability.Thursday.to} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             F
//           </span>
//           <span className="font-medium">Fri</span>
//           <span className="text-[12px]">
//             {availability.Friday.from} AM - {availability.Friday.to} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             S
//           </span>
//           <span className="font-medium">Sat</span>
//           <span className="text-[12px]">
//             {availability.Saturday.from} AM - {availability.Saturday.to} PM
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-3">
//           <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//             S
//           </span>
//           <span className="font-medium">Sun</span>
//           <span className="text-[12px]">
//             {availability.Sunday.from} AM - {availability.Sunday.to} PM
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HoursProfile;
