"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageNew {
  newFile?: {
    name: string;
    size: number;
    type: string;
  };
  id: string;
  service_type: string;
  url: string;
  user_id: string;
}

interface EducationProfile {
  user_id: string;
  institute: string;
  degree: string;
  discipline: string;
  start: string;
  finish: string;
  created_at: string;
  updated_at: string;
}

interface BankDetails {
  user_id: string;
  bank_name: string;
  account_name: string;
  account_num: string;
  bank_code: string;
  created_at: string;
  updated_at: string;
}

interface TalentProfileState {
  files: ImageNew[];
  educationProfile: EducationProfile;
  bankDetails: BankDetails;
}

export interface RootStateTalentProfileState {
  files: ImageNew[];
  educationProfile: EducationProfile;
  bankDetails: BankDetails;
}

// Initial state
const initialState: TalentProfileState = {
  files: [],
  // {
  //   newFile: {
  //     name: "",
  //     size: 1,
  //     type: "1",
  //   },
  //   url: "/Images/Gallery1.png",
  // },
  educationProfile: {
    user_id: "",
    institute: "",
    degree: "",
    discipline: "",
    start: "",
    finish: "",
    created_at: "",
    updated_at: "",
  },
  bankDetails: {
    user_id: "",
    bank_name: "",
    account_name: "",
    account_num: "",
    bank_code: "",
    created_at: "",
    updated_at: "",
  },
};

// Redux slice for Talent Profile
const talentProfileSlice = createSlice({
  name: "TalentProfile",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<ImageNew[]>) => {
      console.log(action.payload);
      state.files = action.payload;
    },
    updateFile: (state, action: PayloadAction<ImageNew | ImageNew[]>) => {
      console.log(action.payload);
      if (Array.isArray(action.payload)) {
        state.files.push(...action.payload); // Spread for an array
      } else {
        state.files.push(action.payload); // Direct push for a single object
      }
    },

    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },

    clearFiles: (state) => {
      state.files = [];
    },

    updateEducationProfileData: (
      state,
      action: PayloadAction<EducationProfile>
    ) => {
      state.educationProfile = action.payload;
    },

    setBankDetailsData: (state, action: PayloadAction<BankDetails>) => {
      console.log("setBankDetails", action.payload);
      state.bankDetails = action.payload;
    },
  },
});

export const {
  addFile,
  removeFile,
  clearFiles,
  updateEducationProfileData,
  setBankDetailsData,
  updateFile,
} = talentProfileSlice.actions;
export default talentProfileSlice.reducer;
