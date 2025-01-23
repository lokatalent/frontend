import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  signUpEmail: "",
  forgotPasswordEmail: "",
  otp: "",
  resetToken: "",
  user: {},
  loggedIn: false,
  logout: false,
};

export interface RootStateAuth {
  auth: {
    signUpEmail: string; // Change to actual type
    forgotPassword: string;
    otp: string;
    resetToken: string;
    loggedIn: boolean;
    logout: boolean;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_num: string;
      gender: string;
      date_of_birth: string;
      bio: string;
      address: string;
      avatar: string;
      role: string;
      service_role: string;
      is_verified: boolean;
      email_verified: boolean;
      phone_verified: boolean;
      created_at: string;
      updated_at: string;
      loggedIn: boolean;
      logout: boolean;
    };
  };
  // other reducers...
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onSignUp: (state, { payload }) => {
      state.signUpEmail = payload;
    },
    onSaveOTP: (state, { payload }) => {
      state.otp = payload;
    },
    onForgotPassword: (state, { payload }) => {
      state.forgotPasswordEmail = payload;
    },
    saveResetToken: (state, { payload }) => {
      state.resetToken = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoggedin: (state, { payload }) => {
      state.loggedIn = payload;
    },
    setLogout: (state, { payload }) => {
      console.log(payload);
      state.logout = payload;
    },
    resetAuth: (state) => {
      state.signUpEmail = "";
      state.forgotPasswordEmail = "";
      state.otp = "";
      state.resetToken = "";
      state.user = {};
      state.loggedIn = false;
      state.logout = false;
    },
  },
});

export const {
  onSignUp,
  onSaveOTP,
  onForgotPassword,
  saveResetToken,
  setUser,
  setLoggedin,
  setLogout,
  resetAuth,
} = authSlice.actions;
export default authSlice.reducer;
