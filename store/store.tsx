"use client"
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import settingsReducer from "./settings/SettingsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    settings: settingsReducer,
  },
});
