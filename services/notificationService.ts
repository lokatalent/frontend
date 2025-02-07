import { http } from "@/lib/axios";
import { getProfile } from '@/services/profileService';

export type NotificationResponse = {
  id: string;
  type: string;
  title: string;
  bookingID?: string;
  seen: string;
  message: string;
  time: string;
  hasAction?: boolean;
  icon?: JSX.Element;
  avatar?: string;
};

export const getNotifications = async (values?: any) => {
  try {
    let response = await http.post("notification?page=1&size=50", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const readAllNotification = async () => {
  try {
    let response = await http.patch("notification/read");
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const readNotification = async (notificationID: string) => {
  try {
    let response = await http.patch(`notification/${notificationID}/read`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getUnreadNotifications = async () => {
  try {
    let response = await http.get("notification/count");
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const extractNotificationResponse = async (data: any) => {
  const processedNotifications = await Promise.all(
    data.map(async (notification) => {
      const notificationResp: NotificationResponse = {
        id: notification.id,
        title: notification.type,
        type: "user",
        bookingID: notification.booking_id,
        seen: notification.seen,
        message: notification.message,
        time: notification.created_at,
        hasAction: notification.type == "booking"? true : false,
      };

      if (notification.from_user_id.length > 0) {
        const providerDetails = await getProfile(notification.from_user_id);
        if (!providerDetails.error) {
          notificationResp.avatar = providerDetails.data.avatar;
        }
      }

      notificationResp.icon = "/Images/sparkles.png"

      return notificationResp;
    })
  );
  return processedNotifications;
};
