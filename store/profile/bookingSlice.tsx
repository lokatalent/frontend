import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    service: '',
    location: '',
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
    }
  })

  export const {setBookingLocation, setBookingService} = bookingSlice.actions
  export default bookingSlice.reducer