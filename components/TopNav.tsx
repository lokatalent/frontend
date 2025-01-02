// components/TopNav.tsx
"use client"

import { useSelector } from "react-redux";
import PopoverExample from "./nav/Menu";
import NotificationsDropdown from "./nav/NotificationPopover";

const TopNav = () => {
  const user = useSelector((state: any) => state.auth.user)
  const username = `${user.first_name} ${user.last_name}`
  return (
    <nav className="fixed top-0 left-0 w-full bg-white h-[70px] shadow-lg flex justify-between items-center">
      {/* Logo or Brand */}
      <div className=" text-xl font-bold"></div>

      {/* Right Side: Notification Bell and User Profile */}
      <div className="flex items-center gap-3 md:mr-5">
        {/* Notification*/}
        <NotificationsDropdown />

        <div className="h-10 w-[1px] bg-black"></div>

        {/* User Profile */}
        <PopoverExample username={username} />
      </div>
    </nav>
  );
};

export default TopNav;
