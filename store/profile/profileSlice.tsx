"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  verification: string;
  file: File | null | { name: string; size: string; type: string } | string;
  profileDetails: {
    dateofBirth: string;
    city: string;
    address: string;
    state: string;
  };
  profilePics: string;
  information: {
    name: string;
    reason: string;
    email: string;
    phoneNumber: string;
    altPhoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    dateOfBirth: string;
    gender: string;
  };
}

const initialState: ProfileState = {
  verification: "",
  file: null,
  profileDetails: { dateofBirth: "", city: "", address: "", state: "" },
  profilePics: "",
  information: {
    name: "",
    reason: "",
    email: "",
    phoneNumber: "",
    altPhoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    dateOfBirth: "",
    gender: "",
  },
};

export interface RootStateProfile {
  profile: {
    verification: string; // Change to actual type
    file: File | null | { name: string; size: string; type: string } | string; // Change to actual type and shape for file
    // other profile state fields...
    profileDetails: {
      dateofBirth: string;
      city: string;
      address: string;
      state: string;
      date_of_birth?: string
    };
    profilePics: string;
    information: {
      name: string;
      reason: string;
      email: string;
      phoneNumber: string;
      altPhoneNumber: string;
      address: string;
      country: string;
      state: string;
      city: string;
      dateOfBirth: string;
      gender: string;
    };
  };
  // other reducers...
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setVerificationStore: (state, action: PayloadAction<string>) => {
      state.verification = action.payload;
    },
    setFileStore: (state, action: PayloadAction<File | string | null>) => {
      if (action.payload === null) {
        state.file = null;
        return;
      }
      if (typeof action.payload === "string") {
        state.file = action.payload;
        return;
      }
      console.log(action.payload);
      state.file = action.payload;
    },
    setProfilePics: (state, action: PayloadAction<string>) => {
      state.profilePics = action.payload;
    },
    setProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
    setInformation: (
      state,
      action: PayloadAction<Partial<RootStateProfile["profile"]["information"]>>
    ) => {
      // Merge the incoming partial information with the existing state
      state.information = {
        ...state.information,
        ...action.payload,
      };
    },
    resetProfile: (state) => {
      state.verification = "";
      state.file = "";
      state.profileDetails = { dateofBirth: "", city: "", address: "", state: "" };
      state.profilePics = "";
      state.information = {
        name: "",
        reason: "",
        email: "",
        phoneNumber: "",
        altPhoneNumber: "",
        address: "",
        country: "",
        state: "",
        city: "",
        dateOfBirth: "",
        gender: "",
      };
    },
  },
});

export const {
  setVerificationStore,
  setFileStore,
  setProfileDetails,
  setProfilePics,
  setInformation,
  resetProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
