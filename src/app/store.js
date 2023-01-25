import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import bookingReducer from "../reducers/bookingsReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    userData: userReducer,
    bookings: bookingReducer,
  },
});
