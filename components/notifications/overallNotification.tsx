"use client";
import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificationsBar from "@/components/notifications/NotificationsBar";
import RoleSwitch from "@/components/overview/RoleSwitch";
import { useEffect, useState } from "react";

type Notification = {
  id: string;
  title: string;
  description: string;
  icon: string;
  statusNotification: "read" | "unread"; // Added status property
  name: string;
  occupation: string;
  location: string;
  status: string;
  bookingType: string;
  startDate: string;
  endDate: string;
  locationFor: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  taskDescription: string;
};

type NotificationResponse = {
  isNotified: boolean;
  notifications: Notification[];
};
type Role = "all" | "unread";


export default function OverallNotification({ isNotified, notifications}: NotificationResponse) {
    const [role, setRole] = useState<Role>("all");
    const [filteredNotifications, setFilteredNotifications] = useState<
      Notification[]
    >([]);

  const bookingRoles = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
  ];


  const handleRoleChange = (role: Role) => {    
      setRole(role); // Update the state to reflect the selected role
  };

  
  function filterNotifications(data: Notification[], role: string) {
      if (role === "all") {
          // Return all notifications if the role is "all"
          return data;
        } else if (role === "unread") {
            // Return only notifications with `statusNotification` equal to "unread"
            return data.filter(
                (notification: Notification) => notification.statusNotification === "unread"
            );
        }
        // If role doesn't match "all" or "unread", return an empty array or handle as needed
        return [];
    }
    
    useEffect(() => {
        const OldNor: Notification[] = filterNotifications(notifications, role);
        setFilteredNotifications(OldNor);
    }, [role])

  return (
    <div className="ml-8 h-screen">
      {isNotified ? (
        <div className="space-y-6">
          <div className="">
            <RoleSwitch
              roles={bookingRoles}
              initialRole="all"
              onRoleChange={handleRoleChange}
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
