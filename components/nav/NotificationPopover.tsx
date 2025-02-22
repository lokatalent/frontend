"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NotificationResponse,
  getNotifications,
  readNotification,
  extractNotificationResponse,
} from "@/services/notificationService";
import { showToast } from "@/store/auth/toastSlice"
import { handleUnauthorizedError } from "@/lib/utils";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter()
  const userServiceRole = useSelector((state: any) => state.auth.user.service_role);

  const fetchData = async () => {
    setLoading(true);
    let data = {
      seen: "false"
    }
    const response = await getNotifications(data);
    if (!response.error) {
      setLoading(false);
      const notificationResps = await extractNotificationResponse(response.data);
      setNotifications(notificationResps);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const handleViewDetails = async (notificationID, bookingID) => {}

  useEffect(() => {
    fetchData();
  }, []);

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
              className="gap-4 p-4 bg-gray-50 hover:bg-white flex items-center justify-center"
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
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.time}
                    </p>
                  </div>

                  {notification.hasAction && (
                    <button
                      onClick={async () => {
                          await readNotification(notification.id);
                          router.push((userServiceRole === "service_provider") ? `/talent/dashboard/bookings/${notification.bookingID}` : `/dashboard/bookings/${notification.bookingID}`);
                        }
                      }
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
            No unread notifications
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
