
export const baseUrl = "https://api.staging.lokatalent.com/";
// export const baseUrl = "http://localhost:4000/";

export enum BookingStatus {
	BOOKING_OPEN        = "Open",
	BOOKING_COMPLETED   = "Booking Completed",
	BOOKING_IN_PROGRESS = "Booking In Progress",
	BOOKING_CANCELED    = "Booking Canceled",
	BOOKING_ACCEPT      = "Booking Accept",
	BOOKING_REJECT      = "Booking Reject",
};

export enum PaymentStatus {
  PAYMENT_STATUS_PENDING  = "pending",
  PAYMENT_STATUS_CANCELED = "canceled",
  PAYMENT_STATUS_VERIFIED = "verified",
};

export enum UserServiceRole {
  SERVICE_ROLE_REQUESTER = "service_requester",
  SERVICE_ROLE_PROVIDER = "service_provider",
};

export const serviceNameMap = new Map([
  ["cleaning", "Cleaner"],
  ["plumbing", "Plumber"],
  ["cooking", "Cooker"],
  ["driving", "Driver"],
  ["indoor_cleaning", "Indoor Cleaner"],
]);

export const bookingStatusMap = new Map([
  ["open", BookingStatus.BOOKING_OPEN],
  ["completed", BookingStatus.BOOKING_COMPLETED],
  ["in_progress", BookingStatus.BOOKING_IN_PROGRESS],
  ["canceled", BookingStatus.BOOKING_CANCELED],
  ["accept", BookingStatus.BOOKING_ACCEPT],
  ["reject", BookingStatus.BOOKING_REJECT],
]);
