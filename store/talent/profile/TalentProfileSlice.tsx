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

interface TalentProfileState {
  files: ImageNew[]; // Array to store images
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
  },
});

// Export actions and reducer
export const { addFile, removeFile, clearFiles } = talentProfileSlice.actions;
export default talentProfileSlice.reducer;
