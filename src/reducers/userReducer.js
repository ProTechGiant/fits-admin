import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch5, fetch3, fetch2 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

const initialState = {
  user: [],
  loading: false,
  trainer: [],
  trainee: [],
  personal_info: {},
  profession_info: {},
  user_info: {},
};

// export const ADD_PROPERTY = createAsyncThunk(
//   "addProperty",
//   async (formData) => {
//     const result = await axios.post(`${baseUrl}/createProperty`, formData, {
//       // receive two    parameter endpoint url ,form data
//     });
//     console.log("results", result.data);
//     return result.data;
//   }
// );
export const GET_USER_DATA = createAsyncThunk("getUser", async () => {
  const result = await fetch3("/api/admin/users", "get");
  console.log("result", result);
  return result;
});
export const GET_USER_DETAIL_BY_ID = createAsyncThunk(
  "getUserDetails",
  async (id) => {
    console.log("hello id data", id);
    const result = await fetch3(`/api/user/me/${id}`, "get");
    console.log("result", result);
    return result;
  }
);
export const UPDATE_PROFESSION_DETAIL_BY_ID = createAsyncThunk(
  "updateProfessionDetail",
  async (id1) => {
    console.log("hello id data for update", id1);
    const { id, experience_note, experience_year, qualification } = id1;
    console.log("iddddddddd=>", id);
    const result = await fetch2(
      `/api/profession/${id}`,
      { experience_note, experience_year, qualification },
      "put"
    );
    console.log("result=========>", result);
    return result;
  }
);
export const UPDATE_PERSONAL_DETAIL_BY_ID = createAsyncThunk(
  "updateProfessionDetail",
  async (id1) => {
    console.log("hello id data for update", id1);
    const { id, name, city, state, country, date_of_birth, gender } = id1;
    const result = await fetch2(
      `/api/personal/${id}`,
      {
        gender,
        name,
        country,
        city,
        state,
        date_of_birth,
      },
      "put"
    );
    console.log("result=========>", result);
    return result;
  }
);

export const propertyReducer = createSlice({
  name: "property",
  initialState,

  extraReducers: {
    [GET_USER_DATA.pending]: (state, action) => {
      state.loading = true;
    },
    [GET_USER_DATA.fulfilled]: (state, action) => {
      console.log("Action", action.payload);
      state.loading = false;
      state.user = action.payload;
      if (action.payload?.length > 0) {
        var trainerArray = action.payload?.filter(
          (item) => item.role === "trainer"
        );
        var traineeArray = action.payload?.filter(
          (item) => item.role === "trainee"
        );
        if (trainerArray?.length > 0) {
          state.trainer = trainerArray;
        } else {
          state.trainer = [];
        }
        if (traineeArray?.length > 0) {
          state.trainee = traineeArray;
        } else {
          state.trainee = [];
        }
      }
    },
    [GET_USER_DETAIL_BY_ID.pending]: (state, action) => {
      state.loading = true;
    },
    [GET_USER_DETAIL_BY_ID.fulfilled]: (state, action) => {
      console.log("Actionuserdetail", action.payload);
      state.loading = false;
      if (action.payload) {
        state.user_info = action.payload.user;
        if (action.payload.personal_info.length > 0) {
          state.personal_info = action.payload.personal_info?.[0];
        } else {
          state.personal_info = {};
        }
        if (action.payload.profession_info.length > 0) {
          state.profession_info = action.payload.profession_info?.[0];
        } else {
          state.profession_info = {};
        }
      } else {
        state.personal_info = {};
        state.professional_info = {};
        state.user_info = {};
      }
    },
    [UPDATE_PROFESSION_DETAIL_BY_ID.fulfilled]: (state, action) => {
      console.log("Actionnnnnnnn", action.payload);
      state.loading = false;
      state.profession_info = action.payload;
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.fulfilled]: (state, action) => {
      console.log("Actionnnnnnnn", action.payload);
      state.loading = false;
      state.personal_info = action.payload;
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
