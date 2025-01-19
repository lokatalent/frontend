"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
// import profileReducer from "./profile/profileSice";
import toastReducer from "./auth/toastSlice";
import bookingReducer from "./profile/bookingSlice";
import settingsReducer from "./settings/SettingsSlice";
import talentProfileReducer from "./talent/profile/TalentProfileSlice";
import talentServiceReducer from "./talent/service/TalentServiceSlice";
import categoryReducer from "./admin/settings/categorySlice";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // storage,
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  // profile: profileReducer,
  settings: settingsReducer,
  talentProfile: talentProfileReducer,
  auth: authReducer,
  toast: toastReducer,
  booking: bookingReducer,
  service: talentServiceReducer,
  categories: categoryReducer,
});

const persistedReducer = persistReducer<any>(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
