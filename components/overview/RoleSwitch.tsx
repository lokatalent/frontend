'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
// import { usePathname } from "next/navigation";

interface RoleSwitchProps {
  roleHandler: (role: string) => void; // Assuming roleHandler is a function that accepts a role as a string
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({ roleHandler }) => {
  // const pathname = usePathname();
  // console.log(pathname);
  const [isAll, SetIsAll] = useState("all");
  const active: string =
    "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const disabled: string = "bg-transparent text-black hover:text-primaryBlue";

  const roleValue = (role: string) => {
    SetIsAll(role);
    roleHandler(role);
  };

  return (
    <div className="flex bg-[#E5E7EB4A]  px-1 md:px-3 rounded-xl py-1 md:py-2">
      <div className=" ">
        <Button
          onClick={() => roleValue("all")}
          variant="ghost"
          className={`${isAll === "all" ? active : disabled} 'px-3 py-2`}
        >
          All
        </Button>
      </div>
      <div className="">
        <Button
          onClick={() => roleValue("instant-bookings")}
          variant="ghost"
          className={`${
            isAll === "instant-bookings" ? active : disabled
          }, 'px-3 py-2`}
        >
          Instant Bookings
        </Button>
      </div>
      <div className="">
        <Button
          onClick={() => roleValue("schedule-bookings")}
          variant="ghost"
          className={`${
            isAll === "schedule-bookings" ? active : disabled
          }, 'px-3 py-2 `}
        >
          Schedule Bookings
        </Button>
      </div>
    </div>
  );
};

export default RoleSwitch
