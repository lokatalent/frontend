import { http } from "@/lib/axios";

export const createBooking = async (values: any) => {
  try {
    let response = await http.post("booking", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const updateBookingStatus = async (values: any) => {
  try {
    let response = await http.patch(
      `booking/${values.id}/status?status=${values.status}`
    );
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const acceptBooking = async (values: any) => {
  try {
    let response = await http.patch(`booking/${values.id}/accept`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const rejectBooking = async (values: any) => {
  try {
    let response = await http.patch(`booking/${values.id}/reject`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getBooking = async (id: any) => {
  try {
    let response = await http.get(`booking/${id}`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getAllBookings = async (values: any) => {
  try {
    let response = await http.post(`booking/all?page=1&size=10`, values.data);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const getServices = async () => {
  try {
    let response = await http.get(`service-pricing/all`);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const findProviders = async (data: any) => {
  try {
    let response = await http.post(`/booking/find-providers?page=1&size=50`, data);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const selectProvider = async (data: any) => {
  try {
    let response = await http.put(`/booking/select-provider`, data);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const makePayment = async (data: any) => {
  try {
    let response = await http.post(`/payment/initialize-transaction`, data);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};

export const verifyPayment = async (data: any) => {
  try {
    let response = await http.post(`/payment/verify-transaction`, data);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
      status: err?.response?.status,
    };
  }
};
