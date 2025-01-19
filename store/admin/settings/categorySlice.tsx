// types/category.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ServiceCategory {
  id: string;
  name: string;
}


interface CategoryState {
  categories: ServiceCategory[];
  isLoading: boolean;
  error: string | null;
}

export interface RootStateCategoryState {
  categories: ServiceCategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [
    { id: "1", name: "Indoor Cleaning Service" },
    { id: "2", name: "Driving" },
    { id: "3", name: "Solar Panel Installation" },
    { id: "4", name: "Electrical Services" },
  ],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ServiceCategory>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    updateCategory: (state, action: PayloadAction<ServiceCategory>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  setLoading,
  setError,
} = categorySlice.actions;

export default categorySlice.reducer;