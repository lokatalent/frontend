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
    let response = await http.post(`booking/all`, values.data);
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
