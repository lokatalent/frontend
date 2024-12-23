"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  id: string; // Unique ID for each image
  name: string;
  url: string;
}

interface ProfileState {
  files: Image[]; // Array to store images
}

const initialState: ProfileState = {
  files: [],
};

const TalentprofileSlice = createSlice({
  name: "TalentProfile",
  initialState,
  reducers: {
    // Add a new image to the list
    addFile: (state, action: PayloadAction<Image>) => {
      state.files.push(action.payload);
    },

    // Remove an image by ID
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },

    // Clear all files
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { addFile, removeFile, clearFiles } = TalentprofileSlice.actions;
export default TalentprofileSlice.reducer;
