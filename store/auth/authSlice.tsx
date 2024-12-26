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
} = authSlice.actions;
export default authSlice.reducer;
