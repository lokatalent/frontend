"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageNew {
  newFile: {
    name: string;
    size: number;
    type: string;
  };
  url: string;
}

interface EducationProfile {
  user_id: string;
  bank_name: string;
  account_name: string;
  account_num: string;
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
  files: ImageNew[]; // Array to store images
  educationProfile: EducationProfile;
  bankDetails: BankDetails; // Object to store bank details
}

export interface RootStateTalentProfile {
  talentProfile: TalentProfileState; // Nested state structure
}

// Initial state
const initialState: TalentProfileState = {
  files: [
    {
      newFile: {
        name: "",
        size: 1,
        type: "1",
      },
      url: "/Images/Gallery1.png",
    },
  ],
  educationProfile: {
    user_id: "",
    bank_name: "",
    account_name: "",
    account_num: "",
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
    /**
     * Add a new image to the list.
     * @param state - Current state.
     * @param action - Payload containing the new image.
     */
    addFile: (state, action: PayloadAction<ImageNew>) => {
      state.files.push(action.payload);
    },

    /**
     * Remove an image by its URL.
     * @param state - Current state.
     * @param action - Payload containing the URL of the image to remove.
     */
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.url !== action.payload);
    },

    /**
     * Clear all images from the list.
     * @param state - Current state.
     */
    clearFiles: (state) => {
      state.files = [];
    },

    /**
     * Update the bank details.
     * @param state - Current state.
     * @param action - Payload containing the updated bank details.
     */
    updateEducationProfileData: (
      state,
      action: PayloadAction<EducationProfile>
    ) => {
      state.educationProfile = action.payload;
    },

    setBankDetailsData: (state, action: PayloadAction<BankDetails>) => {
      state.bankDetails = action.payload;
    }
  },
});

// Export actions and reducer
export const { addFile, removeFile, clearFiles, updateEducationProfileData, setBankDetailsData } =
  talentProfileSlice.actions;
export default talentProfileSlice.reducer;
