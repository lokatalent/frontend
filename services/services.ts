import { http } from "@/lib/axios";

export const createService = async (values: any) => {
  try {
    let response = await http.post("/users/service", values);
    console.log(response);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};