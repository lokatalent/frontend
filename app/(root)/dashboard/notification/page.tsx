 "use client";

import React, { useEffect, useState } from "react";
import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificationsBar from "@/components/notifications/NotificationsBar";
import OverallNotification from "@/components/notifications/overallNotification";
import { getNotifications } from "@/services/notificationService";
import { showToast } from "@/store/auth/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  description: string;
  icon: string;
  statusNotification: "read" | "unread";
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
  notification: Notification[];
};

export default function Notification() {
  const [notifications, setNotifications] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter()

  const fetchData = async () => {
    setLoading(true);
    let data = {
      type: "",
      booking_id: ""
    }
    const response = await getNotifications(data);
    if (!response.error) {
      setLoading(false);
      console.log(response);
      // setNotifications(data);
    } else {
      setLoading(false);
      if (response.status === 401) {
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
        return router.push("/login");
      }

      return dispatch(
        showToast({
          status: "error",
          message: response.data.message,
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (!notifications || notifications.length < 1) {
    return <EmptyNotification />;
  }

  return (
    <OverallNotification
      isNotified={true}
      // isNotified={notifications.isNotified}
      notifications={notifications}
    />
  );
}
