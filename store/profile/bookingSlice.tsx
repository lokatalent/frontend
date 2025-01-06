import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    service: '',
    location: '',
    allServices: '',
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
      setBookingService: (state, {payload}) => {
        state.service = payload;
      },
      setBookingLocation: (state, {payload}) => {
        state.location = payload;
      },
      setAllServices: (state, {payload}) => {
        state.allServices = payload;
      },
    }
  })

  export const {setBookingLocation, setBookingService, setAllServices} = bookingSlice.actions
  export default bookingSlice.reducer