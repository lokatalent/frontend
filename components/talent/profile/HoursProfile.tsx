// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   RootStateTalentService,
//   setService,
// } from "@/store/talent/service/TalentServiceSlice";
// import { getAllService, updateService } from "@/services/services";
// import { showToast } from "@/store/auth/toastSlice";
// import { errorHandler } from "@/lib/utils";
// import EditAvailability from "./editing/EditAvailablity";
// import { RootStateProfile } from "@/store/profile/profileSlice";
// import { RootStateTalentProfileState } from "@/store/talent/profile/TalentProfileSlice";
// import { RootStateAuth } from "@/store/auth/authSlice";

// // type DayOfWeek =
// //   | "Monday"
// //   | "Tuesday"
// //   | "Wednesday"
// //   | "Thursday"
// //   | "Friday"
// //   | "Saturday"
// //   | "Sunday";
// type TimeSlot = { start: string; end: string };

// interface DayAvailability {
//   isActive: boolean;
//   from: string;
//   to: string;
// }

// type DayOfWeek =
//   | "Monday"
//   | "Tuesday"
//   | "Wednesday"
//   | "Thursday"
//   | "Friday"
//   | "Saturday"
//   | "Sunday";

// interface DayAvailability {
//   isActive: boolean;
//   from: string;
//   to: string;
// }
// interface Availability {
//   [key: string]: DayAvailability;
// }

// interface ServiceAvailability {
//   [key: string]: TimeSlot;
// }

// const DAYS_OF_WEEK: DayOfWeek[] = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const DAY_ABBREVIATIONS: Record<DayOfWeek, string> = {
//   Monday: "M",
//   Tuesday: "T",
//   Wednesday: "W",
//   Thursday: "T",
//   Friday: "F",
//   Saturday: "S",
//   Sunday: "S",
// };

// const DayDisplay = ({
//   day,
//   abbreviation,
//   availability,
// }: {
//   day: DayOfWeek;
//   abbreviation: string;
//   availability: DayAvailability;
// }) => (
//   <div className="flex flex-col items-center space-y-3">
//     <span className="flex-center text-sm p-5 h-8 w-8 rounded-full bg-[#DF86002E]">
//       {abbreviation}
//     </span>
//     <span className="font-medium">{day.slice(0, 3)}</span>
//     <span className="text-[12px]">
//       {availability.from}AM - {availability.to}PM
//     </span>
//   </div>
// );

// function HoursProfile() {
//   const dispatch = useDispatch();
//   const service = useSelector(
//     (state: RootStateTalentService) => state.service.service
//   );
//   console.log(service);
//   const userID = useSelector((state: RootStateAuth) => state.auth.user.id);

//   useEffect(() => {

//   })

//   const mapServiceToAvailability = (serviceData: any): Availability => {
//     return DAYS_OF_WEEK.reduce((acc, day) => {
//       const lowercase = day.toLowerCase(); 
//       console.log(serviceData)
//       return {
//         ...acc,
//         [day]: {
//           isActive: true,
//           from: serviceData.availability[lowercase]?.start || "--:--",
//           to: serviceData.availability[lowercase]?.end || "--:--",
//         },
//       };
//     }, {} as Availability);
//   };

//   const [availability, setAvailability] = useState<Availability>(
//     mapServiceToAvailability(service)
//   );

//   const mapAvailabilityToService = (
//     availabilityData: Availability
//   ): ServiceAvailability => {
//     return DAYS_OF_WEEK.reduce((acc, day) => {
//       return {
//         ...acc,
//         [day.toLowerCase()]: {
//           start: availabilityData[day].from,
//           end: availabilityData[day].to,
//         },
//       };
//     }, {} as ServiceAvailability);
//   };

//   const handleSaveAvailability = async (updatedAvailability: Availability) => {
//     try {
//       // setAvailability(updatedAvailability);
//       const response1 = await getAllService(userID);
//       // if (response1?.data || response1.data.length > 0) {
//       if (!response1?.data || response1.data.length === 0) {
//         // dispatch(
//         //   setService({
//         //     experience_years: "",
//         //     service_type: "",
//         //     service_desc: "",
//         //     rate_per_hour: 0,
//         //     availability: {
//         //       monday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       tuesday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       wednesday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       thursday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       friday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       saturday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //       sunday: {
//         //         start: "",
//         //         end: "",
//         //       },
//         //     },
//         //     address: "",
//         //   })
//         // );
//         dispatch(showToast({
//           status: "error",
//           message: "No services found for the user.",
//         }));
//         return;
//       }

//       const updatedService = {
//         experience_years: service.experience_years,
//         service_type: service.service_type,
//         service_desc: service.service_desc,
//         rate_per_hour: service.rate_per_hour,
//         address: service.address,
//         availability: mapAvailabilityToService(updatedAvailability),
//       };
//       const response = await updateService(updatedService);
//        if (!response.error) {
//          // success
//          dispatch(setService(response.data));
//          dispatch(
//            showToast({
//              status: "success",
//              message: "Availability updated successfully",
//            })
//          );
//        } else {
//          // error
//          throw new Error(errorHandler(response.data));
//        }
     
//     } catch (error) {
//       dispatch(
//         showToast({
//           status: "error",
//           message:
//             error instanceof Error
//               ? error.message
//               : "Failed to update availability",
//         })
//       );
//     }
//   };

//   return (
//     <div className="card">
//       <div className="flex justify-between mb-6 items-center">
//         <h2 className="text-base font-normal">Available Hours</h2>
//         <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center">
//           <EditAvailability
//             initialAvailability={availability}
//             onSave={handleSaveAvailability}
//           />
//         </div>
//       </div>

//       <div className="flex flex-wrap justify-center  sm:grid sm:grid-cols-7 gap-4">
//         {DAYS_OF_WEEK.map((day) => (
//           <DayDisplay
//             key={day}
//             day={day}
//             abbreviation={DAY_ABBREVIATIONS[day]}
//             availability={availability[day]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HoursProfile;

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
import { RootStateAuth } from "@/store/auth/authSlice";

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
      {availability.from} - {availability.to}
    </span>
  </div>
);

function HoursProfile() {
  const dispatch = useDispatch();
  const service = useSelector(
    (state: RootStateTalentService) => state.service.service
  );
  const userID = useSelector((state: RootStateAuth) => state.auth.user?.id);

  const mapServiceToAvailability = (serviceData: any): Availability => {
    return DAYS_OF_WEEK.reduce((acc, day) => {
      const lowercase = day.toLowerCase();
      return {
        ...acc,
        [day]: {
          isActive: true,
          from: serviceData?.availability[lowercase]?.start || "--:--",
          to: serviceData?.availability[lowercase]?.end || "--:--",
        },
      };
    }, {} as Availability);
  };

  const [availability, setAvailability] = useState<Availability>(
    service ? mapServiceToAvailability(service) : {}
  );

  useEffect(() => {
    if (service) {
      setAvailability(mapServiceToAvailability(service));
    }
  }, [service]);

  const mapAvailabilityToService = (
    availabilityData: Availability
  ): ServiceAvailability => {
    return DAYS_OF_WEEK.reduce((acc, day) => {
      return {
        ...acc,
        [day.toLowerCase()]: {
          start: availabilityData[day]?.from || "--:--",
          end: availabilityData[day]?.to || "--:--",
        },
      };
    }, {} as ServiceAvailability);
  };

  const handleSaveAvailability = async (updatedAvailability: Availability) => {
    try {
      if (!userID) throw new Error("User ID is not available.");
      const response1 = await getAllService(userID);

      if (!response1?.data || response1.data.length === 0) {
        dispatch(
          showToast({
            status: "error",
            message: "No services found for the user.",
          })
        );
        return;
      }

      const updatedService = {
        ...service,
        availability: mapAvailabilityToService(updatedAvailability),
      };

      const response = await updateService(updatedService);
      if (!response.error) {
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
    } catch (error) {
      dispatch(
        showToast({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to update availability.",
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

      <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-7 gap-4">
        {DAYS_OF_WEEK.map((day) => (
          <DayDisplay
            key={day}
            day={day}
            abbreviation={DAY_ABBREVIATIONS[day]}
            availability={
              availability[day] || {
                isActive: false,
                from: "--:--",
                to: "--:--",
              }
            }
          />
        ))}
      </div>
    </div>
  );
}

export default HoursProfile;
