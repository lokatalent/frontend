"use client";
import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificationsBar from "@/components/notifications/NotificationsBar";
import {
  NotificationResponse,
  getNotifications,
  extractNotificationResponse,
} from "@/services/notificationService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

type notificationFilterValue = "all" | "unread";

function NotificationFilter({filters, initialFilter, onFilterChange, className}) {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  // Default active and disabled styles
  const defaultActiveClass =
    "rounded-md bg-primaryBlue text-white hover:bg-primaryBlue hover:text-white";
  const defaultDisabledClass =
    "bg-transparent text-black hover:text-primaryBlue";

  const handleFilterChange = (filter: notificationFilterValue) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div
      className={`flex w-full sm:w-max overflow-x-auto bg-[#E5E7EB4A] px-1 md:px-3 rounded-xl py-1 md:py-2 ${className}`}
    >
      <div className="flex space-x-2 sm:space-x-4 md:justify-center">
        {filters.map((filter) => (
          <div key={filter.value} className="flex-shrink-0">
            <Button
              onClick={() => handleFilterChange(filter.value)}
              variant="ghost"
              className={`${
                selectedFilter === filter.value
                  ? defaultActiveClass
                  : defaultDisabledClass
              } px-3 py-2`}
            >
              {filter.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function OverallNotification({isNotified, notifications}) {
  const [filter, setFilter] = useState<notificationFilterValue>("all");
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationResponse[]>([]);

  const notificationFilter = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
  ];

  const handleFilterChange = (filter: notificationFilterValue) => {
    setFilter(filter); // Update the state to reflect the selected filter
  };

  function filterNotifications(data: NotificationResponse[], filter: string) {
    if (filter === "unread") {
      // Return only unread notifications
      return data.filter(
        (notification: NotificationResponse) =>
          (notification.seen === false) || (notification.seen === "false")
      );
    }
    // Return all notifications if the filter is "all"
    return data;
  }

  useEffect(() => {
    const oldNor: NotificationResponse[] = filterNotifications(notifications, filter);
    setFilteredNotifications(oldNor);
  }, [filter]);

  return (
    <div className="ml-2 h-screen">
      {isNotified ? (
        <div className="space-y-6">
          <div className="">
            <NotificationFilter
              filters={notificationFilter}
              initialFilter="all"
              onFilterChange={handleFilterChange}
            />
          </div>
          <NotificationsBar notifications={filteredNotifications} />
        </div>
      ) : (
        <EmptyNotification />
      )}
    </div>
  );
}
