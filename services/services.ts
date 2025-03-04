import { http } from "@/lib/axios";
let formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data;",
  },
};

export const createService = async (values: any) => {
  try {
    let response = await http.post("/users/service", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};
export const getService = async (values: any) => {
  try {
    let response = await http.get(
      `/users/${values.id}/service`,
      {
        params: {
          service_type: values.service_type,
        }
      }
    );
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};
export const getAllService = async (id: string) => {
  try {
    let response = await http.get(`/users/${id}/service/list`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

// FOR TALENT
export const updateService = async (values: any) => {
  try {
    let response = await http.patch("/users/service", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
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
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const getServiceImages = async (value: any) => {
  try {
    let response = await http.get(
      `/users/${value.id}/service/images`,
      {
        params: {
          service_type: value.service_type,
        }
      }
    );

    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const uploadServiceImages = async (value: any) => {
  try {
    let response = await http.post(
      "/users/service/images",
      {params: { service_type: value.service_type }},
      {images: value.images}, formDataConfig
    );
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};

export const deleteServiceImage = async (value: any) => {
  try {
    let response = await http.delete(
      `/users/service/images/${value.id}`,
      {
        params: {
          service_type: value.service_type,
        }
      }
    );

    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response.data,
      status: err?.response.status,
    };
  }
};
