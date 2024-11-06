'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
// import { usePathname } from "next/navigation";

function RoleSwitch() {
    // const pathname = usePathname();
  // console.log(pathname);
  const [isAll, SetIsAll] = useState('isAll'); 
  const active: string = "px-3 py-2 rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const disabled: string = 'px-3 py-2 bg-transparent text-black hover:text-primaryBlue'

    return (
      <div className="flex bg-[#E5E7EB4A] gap-3 px-3 rounded-xl py-2">
        <div className=" ">
          <Button
            onClick={() => SetIsAll("isAll")}
            variant="ghost"
            className={isAll === "isAll" ? active : disabled}
          >
            All
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => SetIsAll("instant-bookings")}
            variant="ghost"
            className={isAll === "instant-bookings" ? active : disabled}
          >
            Instant Bookings
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => SetIsAll("schedule-bookings")}
            variant="ghost"
            className={isAll === "schedule-bookings" ? active : disabled}
          >
            Schedule Bookings
          </Button>
        </div>
      </div>
    );
}

export default RoleSwitch
