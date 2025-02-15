import { http } from "@/lib/axios";

export const getAdminDashboard = async () => {
  try {
    let response = await http.get("users/admin-dashboard");
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getAdminBookingDashboard = async () => {
  try {
    let response = await http.get("booking/admin-booking-dashboard");
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getAllUsers = async () => {
  try {
    let response = await http.get("users?page=1&size=50");
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};
