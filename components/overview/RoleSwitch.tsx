// 'use client';
// import React, { useState } from 'react';
// import { Button } from '../ui/button';
// // import { usePathname } from "next/navigation";

// interface RoleSwitchProps {
//   roleHandler: (role: string) => void; // Assuming roleHandler is a function that accepts a role as a string
// }

// const RoleSwitch: React.FC<RoleSwitchProps> = ({ roleHandler }) => {
//   // const pathname = usePathname();
//   // console.log(pathname);
//   const [isAll, SetIsAll] = useState("all");
//   const active: string =
//     "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
//   const disabled: string = "bg-transparent text-black hover:text-primaryBlue";

//   const roleValue = (role: string) => {
//     SetIsAll(role);
//     roleHandler(role);
//   };

//   return (
//     <div className="flex bg-[#E5E7EB4A]  px-1 md:px-3 rounded-xl py-1 md:py-2">
//       <div className=" ">
//         <Button
//           onClick={() => roleValue("all")}
//           variant="ghost"
//           className={`${isAll === "all" ? active : disabled} 'px-3 py-2`}
//         >
//           All
//         </Button>
//       </div>
//       <div className="">
//         <Button
//           onClick={() => roleValue("instant-bookings")}
//           variant="ghost"
//           className={`${
//             isAll === "instant-bookings" ? active : disabled
//           }, 'px-3 py-2`}
//         >
//           Instant Bookings
//         </Button>
//       </div>
//       <div className="">
//         <Button
//           onClick={() => roleValue("schedule-bookings")}
//           variant="ghost"
//           className={`${
//             isAll === "schedule-bookings" ? active : disabled
//           }, 'px-3 py-2 `}
//         >
//           Schedule Bookings
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RoleSwitch

"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

// Define more flexible props
interface RoleSwitchProps {
  // Array of role options to make the component more dynamic
  roles: Array<{
    value: string;
    label: string;
  }>;
  // Optional initial selected role
  initialRole?: string;
  // Callback function when role changes
  onRoleChange: (role: 'all' | 'unread') => void;
  // Optional custom styling
  className?: string;
}

type Role = "all" | "unread";

const RoleSwitch: React.FC<RoleSwitchProps> = ({
  roles,
  initialRole = "all",
  onRoleChange,
  className,
}) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);

  // Default active and disabled styles, can be overridden
  const defaultActiveClass =
    "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const defaultDisabledClass =
    "bg-transparent text-black hover:text-primaryBlue";

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div
      className={`flex w-max bg-[#E5E7EB4A] px-1 md:px-3 rounded-xl py-1 md:py-2 ${className}`}
    >
      {roles.map((role) => (
        <div key={role.value} className="mx-1">
          <Button
            onClick={() => handleRoleChange(role.value)}
            variant="ghost"
            className={`
              ${
                selectedRole === role.value
                  ? defaultActiveClass
                  : defaultDisabledClass
              } 
              px-3 py-2
            `}
          >
            {role.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RoleSwitch;