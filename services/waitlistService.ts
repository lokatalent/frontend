import { http } from "@/lib/axios";


export const addEmailToWaitlist = async (email: string) => {
  try {
    let response = await http.post(`/users/waitlist?email=${email}`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};