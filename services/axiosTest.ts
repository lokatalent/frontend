import { baseUrl } from "@/lib/utils";
import axios from "axios";

export const loginTest = async (body: any) => {
  const response = await axios.request({
    method: "GET",
    url: baseUrl + "auth/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: body, // Add JSON body here
  });
  console.log("From Tests", response);
  return { error: true, data: response.data, status: response.status };
};
