// "use client";
import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificationsBar from "@/components/notifications/NotificationsBar";
import OverallNotification from "@/components/notifications/overallNotification";
import RoleSwitch from "@/components/overview/RoleSwitch";

type Notification = {
  id: string;
  title: string;
  message: string;
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
  notification: Notification[];
};

const notificationsData: NotificationResponse = {
  isNotified: true, // Set to true if there are notifications
  notification: [
    {
      id: "1",
      title: "Booking accepted",
      message:
        "Your booking has been accepted! The talent will arrive as scheduled.",
      icon: "/Images/sparkles.png", // Corrected path
      statusNotification: "unread",
      name: "Jayden Cooper",
      occupation: "Indoor Cleaner",
      location: "Ile-Ife, Nigeria",
      status: "Booking Accepted",
      bookingType: "Scheduled Booking",
      startDate: "25/03/2024",
      endDate: "25/03/2024",
      locationFor: "Address - 15, aasherifa road, eleyele, Ile-Ife",
      serviceType: "Indoor Cleaning Service",
      startTime: "09:00 AM",
      endTime: "04:00 PM",
      taskDescription:
        "I need someone to help with cleaning, washing, sweeping and other household cleaning",
    },
    {
      id: "3",
      title: "Booking accepted",
      message:
        "Your booking has been accepted! The talent will arrive as scheduled.",
      icon: "/Images/sparkles.png", // Corrected path
      statusNotification: "read",
      name: "Gabriel Daramola",
      occupation: "Plumber",
      location: "Ile-Ife, Nigeria",
      status: "Booking Pending",
      bookingType: "Instant Booking",
      startDate: "15/09/2024",
      endDate: "21/08/2024",
      locationFor: "20, Ede road, Ile-Ife",
      serviceType: "Household Plumbing work",
      startTime: "01:00 AM",
      endTime: "03:00 AM",
      taskDescription: "I need someone to help repair my house pipes",
    },
    {
      id: "4",
      title: "Booking accepted",
      message:
        "Your booking has been accepted! The talent will arrive as scheduled.",
      icon: "/Images/sparkles.png", // Corrected path
      statusNotification: "unread",
      name: "Jayden Cooper",
      occupation: "Indoor Cleaner",
      location: "Ile-Ife, Nigeria",
      status: "Booking Accepted",
      bookingType: "Scheduled Booking",
      startDate: "25/03/2024",
      endDate: "25/03/2024",
      locationFor: "Address - 15, aasherifa road, eleyele, Ile-Ife",
      serviceType: "Indoor Cleaning Service",
      startTime: "09:00 AM",
      endTime: "04:00 PM",
      taskDescription:
        "I need someone to help with cleaning, washing, sweeping and other household cleaning",
    },
    {
      id: "2",
      title: "Booking Cancelled",
      message:
        "Your booking request has been cancelled lorem ipsum lorem ipsumlorem ipsum lotem lorem bbnnnnnnnlorem ",
      icon: "/Images/booked-cancel.png", // Corrected path
      statusNotification: "unread",
      name: "Mavis Bacon",
      occupation: "Driver",
      location: "Ile-Ife, Nigeria",
      status: "Booking Declined",
      bookingType: "Scheduled Booking",
      startDate: "25/03/2024",
      endDate: "25/03/2024",
      locationFor: "15, Texaco, Ondo road, Ile-Ife",
      serviceType: "Indoor Cleaning Service",
      startTime: "09:10 AM",
      endTime: "09:00 PM",
      taskDescription: "I need someone to help with my luggage",
    },
  ],
};

export default function Notification() {
  const { isNotified, notification } = notificationsData;

  return (
    <div>
      <OverallNotification
        isNotified={isNotified}
        notifications={notification}
      />
    </div>
  );
}
