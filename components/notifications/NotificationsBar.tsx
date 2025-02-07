"use client";
import Image from "next/image";
import React from "react";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import {
  NotificationResponse,
  getNotifications,
  readNotification,
  extractNotificationResponse,
} from "@/services/notificationService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type NotificationsBarProps = {
  notifications: NotificationResponse[];
};

const NotificationsBar: React.FC<NotificationsBarProps> = ({
  notifications,
}) => {
  const userServiceRole = useSelector((state: any) => state.auth.user.service_role);
  const router = useRouter();
  return (
    <div className="space-y-3">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`bg-white w-full notify rounded-br-md rounded-tr-md p-6 flex flex-col sm:flex-row justify-between items-center ${
            notification.seen === "false"
              ? "border-[#DF8600] border-l-[5px]"
              : ""
          }`}
        >
          <div className="flex items-center space-x-3 w-full sm:w-[90%]">
            <div className="flex items-center justify-center bg-white shadow-lg p-2 w-[40px] h-[40px] rounded-full">
              <Image
                src={notification.avatar || notification.icon}
                alt="Notification Bing"
                width={20}
                height={20}
                // layout="fill"
                className="object-cover rounded-[100px]"
              />
            </div>
            <div className="flex md:items-center space-y-3 flex-col sm:flex-row sm:space-x-4">
              <p className="text-primaryBlue text-sm">{notification.title}</p>
              <BiSolidRightArrowAlt className="hidden md:block text-primaryBlue" />
              <p className="text-black text-sm w-full md:w-[75%]">
                {notification.message}
              </p>
            </div>
          </div>
          {notification.hasAction && (
            <div className="self-start mt-3">
              <button
                onClick={async () => {
                    await readNotification(notification.id);
                    router.push((userServiceRole === "service_provider") ? `/talent/dashboard/bookings/${notification.bookingID}` : `/dashboard/bookings/${notification.bookingID}`);
                  }
                }
                className="text-white h-10 rounded-md text-sm py-2 bg-primaryBlue w-[10rem] flex-center block"
              >
                View Details
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationsBar;
