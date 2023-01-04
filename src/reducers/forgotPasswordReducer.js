import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3, fetch4 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

const initialState = {
  forgotPassword: [],
  loading: false,
  error: "",
  message: "",
  updated: "",
};

export const FORGOT_PASSWORD = createAsyncThunk(
  "forgotPass",
  async (formData) => {
    const result = await axios.post(`${baseUrl}/forgotPassword`, formData, {});

    return result;
  }
);

export const RESET_PASSWORD = createAsyncThunk(
  "resetPassword",
  async (body) => {
    const result = await fetch3(`/reset/${body.token}`, "get");

    return result;
  }
);

export const UPDATE_PASSWORD = createAsyncThunk(
  "updatePassword",
  async (body) => {
    const result = await fetch2(`/updatePassword/${body.token}`, body, "put");

    return result;
  }
);

export const forgotPasswordReducer = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: {
    [FORGOT_PASSWORD.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data.message) {
        // state.forgotPassword.push(action.payload.data);
        if (action.payload.error) {
          state.error = action.payload.error;
          state.message = false;
        } else {
          state.error = false;
          state.message = action.payload.data.message;
        }
      }
    },
    [FORGOT_PASSWORD.pending]: (state, action) => {
      state.loading = true;
    },

    [RESET_PASSWORD.fulfilled]: (state, action) => {
      state.error = action?.payload?.error;
      // return message;
    },
    [UPDATE_PASSWORD.fulfilled]: (state, action) => {
      state.updated = action.payload.message;
      // return message;
    },
  },
});

export default forgotPasswordReducer.reducer;
