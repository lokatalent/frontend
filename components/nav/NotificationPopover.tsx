"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: number;
  type: "system" | "user";
  title: string;
  time: string;
  icon?: JSX.Element;
  subtitle?: string;
  hasAction?: boolean;
  avatar?: string;
}

async function getNotifications(): Promise<NotificationItem[]> {
  return [
    {
      id: 1,
      type: "system",
      title: "Your account set up has now been lorem ipsum",
      time: "8 min ago",
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      type: "user",
      title: "Edward Curr",
      subtitle: "Accepted your Booking",
      time: "12 min ago",
      hasAction: true,
      avatar: "/Images/dp.png",
    },
  ];
}

const NotificationPanel = () => {
  const router = useRouter();
  const notifications = [
    {
      id: 1,
      type: "system",
      title: "Your account set up has now been lorem ipsum",
      time: "8 min ago",
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      type: "user",
      title: "Edward Curr",
      subtitle: "Accepted your Booking",
      time: "12 min ago",
      hasAction: true,
      avatar: "/Images/dp.png",
    },
  ];

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          Notifications
          <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
            {notifications?.length}
          </span>
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.length ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex gap-4 p-4 bg-gray-50 hover:bg-white flex items-center justify-center"
            >
              {notification.type === "user" ? (
                <div className="w-10 h-10 rounded-full ">
                  <Image
                    src={notification.avatar || "/Images/dp-empty.png"}
                    alt="Profile Pics"
                    width={40}
                    height={40}
                  />
                </div>
              ) : (
                notification.icon
              )}

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div>
                    <p className="text-[0.9rem] sm:text-md font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.subtitle}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.time}
                    </p>
                  </div>

                  {notification.hasAction && (
                    <button
                      onClick={() => router.push("/dashboard/bookings/1")}
                      className="rounded-md bg-blue-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600 mt-3"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-28">
            No Notifications
          </div>
        )}
      </div>
    </div>
  );
};

// Optional dropdown wrapper component for the panel
const NotificationsDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 rounded-md p-2 hover:bg-gray-100">
        <div className=" hover:text-gray-300 relative">
          <FaRegBell color="black" size={24} />
          {/* Notification Badge (optional) */}
          <span className="absolute top-1 right-0 inline-flex items-center justify-center w-2 h-2 text-xs font-bold leading-none text-white bg-primaryBlue rounded-full"></span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="absolute bg-white p-0 right-[-90px] md:right-[-165px] rounded-md mt-2 w-[270px] sm:w-96 transform">
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
