import { http } from "@/lib/axios";

export const signup = async (values: any) => {
  try {
    let response = await http.post("auth/registration", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};

export const signin = async (values: any) => {
  try {
    let response = await http.post("auth/login", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};

export const forgotPassword = async (values: any) => {
  try {
    let response = await http.post("auth/send-password-reset-token", values);
    return { error: false, data: response.data, status: response.status };
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
      status: err.response.status,
    };
  }
};

export const verifyEmail = async (values: any) => {
    try {
      let response = await http.post("auth/email/verify", values);
      return { error: false, data: response.data, status: response.status };
    } catch (err: any) {
      return {
        error: true,
        data: err.response.data,
        status: err.response.status,
      };
    }
  };
  
  export const resendMail = async (values: any) => {
    try {
      let response = await http.post("auth/email/resend-notification", values);
      return { error: false, data: response.data, status: response.status };
    } catch (err: any) {
      return {
        error: true,
        data: err.response.data,
        status: err.response.status,
      };
    }
  };
  
  export const sendResetToken = async (values: any) => {
    try {
      let response = await http.post("auth/send-password-reset-token", values);
      return { error: false, data: response.data, status: response.status };
    } catch (err: any) {
      return {
        error: true,
        data: err.response.data,
        status: err.response.status,
      };
    }
  };
  
  export const resetPassword = async (values: any) => {
    try {
      let response = await http.post("auth/reset-password", values);
      return { error: false, data: response.data, status: response.status };
    } catch (err: any) {
      return {
        error: true,
        data: err.response.data,
        status: err.response.status,
      };
    }
  };