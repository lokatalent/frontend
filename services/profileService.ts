import { http } from "@/lib/axios";
let formDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data;'
  }
}

export const getOwnProfile = async () => {
  try {
    let response = await http.get("/users/profile");
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const updateProfile = async (values: any) => {
  try {
    // console.log(values)
    let response = await http.patch("/users/profile", values);
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const updateBankProfile = async (values: any) => {
  try {
    // console.log(values)
    let response = await http.patch("/users/profile/bank", values);
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const getBankProfile = async () => {
  try {
    // console.log(values)
    let response = await http.get("users/profile/bank");
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};


export const updateProfileImage = async (values: any) => {
  try {
    let response = await http.patch("/users/profile/picture-update", values, formDataConfig);
    console.log(response);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};




export const updateEducationProfile = async (values: any) => {
  try {
    // console.log(values);
    let response = await http.patch("/users/profile/education", values);
    return { error: false, data: response?.data, status: response?.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

// export const updateBankProfile = async (values: any) => {
//   try {
//     // console.log(values);
//     let response = await http.patch("/users/profile/bank", values);
//     return { error: false, data: response?.data, status: response?.status };
//   } catch (err: any) {
//     return {
//       error: true,
//       data: err.response.data,
//       status: err.response.status,
//     };
//   }
// };