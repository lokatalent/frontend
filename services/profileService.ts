import { http } from "@/lib/axios";

export const getOwnProfile = async () => {
  try {
    let response = await http.get("/users/profile");
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};
export const updateProfile = async (values: any) => {
  try {
    let response = await http.patch("/users/profile", values);
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};

export const updateProfileImage = async (values) => {
  try {
    let response = await http.patch("/users/profile/picture-update", values);
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
