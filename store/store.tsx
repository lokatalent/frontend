"use client"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import profileReducer from "./profile/profileSlice";
import toastReducer from "./auth/toastSlice";
import settingsReducer from "./settings/SettingsSlice";
import talentProfileReducer from "./talent/profile/TalentProfileSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    settings: settingsReducer,
    talentProfile: talentProfileReducer,
    auth: authReducer,
    toast: toastReducer,
  },
});
