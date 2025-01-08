import { http } from "@/lib/axios";

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