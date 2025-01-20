import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: "",
  location: "",
  bookingData: "",
  allServices: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingService: (state, { payload }) => {
      state.service = payload;
    },
    setBookingLocation: (state, { payload }) => {
      state.location = payload;
    },
    setBookingData: (state, { payload }) => {
      state.bookingData = payload;
    },
    setAllServices: (state, { payload }) => {
      state.allServices = payload;
    },
    resetBooking: (state) => {
      state.service = "";
      state.location = "";
      state.allServices = "";
    },
  },
});

export const {
  setBookingLocation,
  setBookingService,
  setBookingData,
  setAllServices,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
