import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

import { fetch3, fetch2 } from "./helper/fetch";

const initialState = {
  loading: false,
  success: false,
  bookings: [],
  recommendedSessionData: [],
};

export const BOOKED_SEESIONS = createAsyncThunk("bookedSessions", async () => {
  const result = await fetch3(`${baseUrl}/api/book-a-session`, "get");
  return result;
});

export const RECOMMEND_SEESIONS = createAsyncThunk(
  "recommendSessions",
  async (data) => {
    const result = await fetch2(
      `${baseUrl}/api/book-a-session/recommended/${data?._id}`,
      {
        recommended: !data?.recommended,
      },
      "put"
    );
    return result;
  }
);

export const bookingReducer = createSlice({
  name: "property",
  initialState,

  extraReducers: {
    [BOOKED_SEESIONS.pending]: (state, action) => {
      state.loading = true;
    },
    [BOOKED_SEESIONS.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode === 200) {
        state.bookings = action.payload.data;
      }
    },
    [RECOMMEND_SEESIONS.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.recommendedSessionData = action.payload;
        state.success = true;
      }
    },
  },
});

export default bookingReducer.reducer;
