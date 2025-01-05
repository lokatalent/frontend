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
export const getService = async (values: any) => {
  try {
    console.log(values);
    let response = await http.get(
      `/users/${values.id}/service?service_type=${values.service_type}`
    );
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
export const getAllService = async (id: string) => {
  try {
    let response = await http.get(`/users/${id}/service/list`);
    console.log(id);
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

// FOR TALENT
export const updateService = async (values: any) => {
  try {
    let response = await http.patch("/users/service", values);
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

export const getServiceType = async () => {
  try {
    let response = await http.get(`/service-pricing/all`);

    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};
