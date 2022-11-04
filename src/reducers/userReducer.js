import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "./helper/fetch";

const initialState = {
  user: [],
  loading: false,
  trainer: [],
  trainee: [],
  personal_info: {},
  profession_info: {},
  user_info: {},
};

export const GET_USER_DATA = createAsyncThunk("getUser", async () => {
  const result = await fetch3("/api/admin/users", "get");

  return result;
});
export const GET_USER_DETAIL_BY_ID = createAsyncThunk(
  "getUserDetails",
  async (id) => {
    const result = await fetch3(`/api/user/me/${id}`, "get");

    return result;
  }
);
export const UPDATE_PROFESSION_DETAIL_BY_ID = createAsyncThunk(
  "updateProfessionDetail",
  async (id1) => {
    const { id, experience_note, experience_year, qualification } = id1;

    const result = await fetch2(
      `/api/profession/${id}`,
      { experience_note, experience_year, qualification },
      "put"
    );
    return result;
  }
);
export const UPDATE_PERSONAL_DETAIL_BY_ID = createAsyncThunk(
  "updateProfessionDetail",
  async (id1) => {
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
      state.loading = false;
      state.user = action.payload.data;
      if (action.payload.data?.length > 0) {
        const trainerArray = action.payload.data?.filter(
          (item) => item.role === "trainer"
        );
        const traineeArray = action.payload.data?.filter(
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
      state.loading = false;
      if (action.payload.data) {
        state.user_info = action.payload.data.user;
        if (action.payload.data.personal_info.length > 0) {
          state.personal_info = action.payload.data.personal_info?.[0];
        } else {
          state.personal_info = {};
        }
        if (action.payload.data.profession_info.length > 0) {
          state.profession_info = action.payload.data.profession_info?.[0];
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
      state.loading = false;
      state.profession_info = action.payload.data;
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      state.personal_info = action.payload.data;
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
