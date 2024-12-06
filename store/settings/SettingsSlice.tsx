"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  editModal: boolean;
  mainModal: boolean;
  nameResponseModal: boolean;
  confirmationMailModal: boolean;
  verificationMailModal: boolean;
  twoStepVerificationModal: boolean;
  activeTwoStepVerification: boolean;
}
const initialState: SettingsState = {
  editModal: false,
  mainModal: false,
  nameResponseModal: false,
  confirmationMailModal: false,
  verificationMailModal: false,
  twoStepVerificationModal: false,
  activeTwoStepVerification: false, 
};

export interface RootState {
  settings: {
    editModal: boolean; // Change to actual type
    mainModal: boolean;
    nameResponseModal: boolean;
    confirmationMailModal: boolean;
    verificationMailModal: boolean;
    twoStepVerificationModal: boolean;
    activeTwoStepVerification: boolean;
  };
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMainModal: (state, action: PayloadAction<boolean>) => {
      state.mainModal = action.payload;
    },
    setEditModal: (state, action: PayloadAction<boolean>) => {
      state.editModal = action.payload;
    },
    setNameResponseModal: (state, action: PayloadAction<boolean>) => {
      state.nameResponseModal = action.payload;
    },
    setConfirmationMailModal: (state, action: PayloadAction<boolean>) => {
      state.confirmationMailModal = action.payload;
    },
    setVerificationMailModal: (state, action: PayloadAction<boolean>) => {
      state.verificationMailModal = action.payload;
    },
    setTwoStepVerificationModal: (state, action: PayloadAction<boolean>) => {
      state.twoStepVerificationModal = action.payload;
    },
    setActiveTwoStepVerification: (state, action: PayloadAction<boolean>) => {
      state.activeTwoStepVerification = action.payload;
    }
  },
});

export const {
  setMainModal,
  setEditModal,
  setNameResponseModal,
  setConfirmationMailModal,
  setVerificationMailModal,
  setTwoStepVerificationModal,
  setActiveTwoStepVerification,
} = settingsSlice.actions;
export default settingsSlice.reducer;
