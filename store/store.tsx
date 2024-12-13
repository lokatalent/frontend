"use client"
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import settingsReducer from "./settings/SettingsSlice";
import talentProfileReducer from "./talent/profile/TalentProfileSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    settings: settingsReducer,
    talentProfile: talentProfileReducer,
  },
});
