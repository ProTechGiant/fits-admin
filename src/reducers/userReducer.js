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
  services: [],
  reviews: [],
  session: [],
  stripe: {},
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
  "updatePersonalDetail",
  async (id1) => {
    const {
      id,
      name,
      city,
      state,
      country,
      date_of_birth,
      gender,
      profileImage,
    } = id1;

    const result = await fetch2(
      `/api/personal/${id}`,
      {
        gender,
        name,
        country,
        city,
        state,
        date_of_birth,
        profileImage,
      },
      "put"
    );
    return result;
  }
);
export const UPDATE_UserGoal_DETAIL_BY_ID = createAsyncThunk(
  "updateUserGoalDetail",
  async (id1) => {
    const { id, fitness_goal, fitness_level, services_offered } = id1;

    const result = await fetch2(
      `/api/fitness/${id}`,
      {
        fitness_goal,
        fitness_level,
        services_offered,
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
      state.user = action.payload;
      if (action.payload?.length > 0) {
        const trainerArray = action.payload?.filter(
          (item) => item.role === "trainer"
        );
        const traineeArray = action.payload?.filter(
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
      if (action?.payload?.statusCode === 201 && action?.payload?.user) {
        state.user_info = action?.payload?.user;
        if (action?.payload?.personal_info) {
          state.personal_info = action?.payload?.personal_info;
        } else {
          state.personal_info = {};
        }
        if (action?.payload?.profession_info) {
          state.profession_info = action?.payload?.profession_info;
        } else {
          state.profession_info = {};
        }
        if (action?.payload?.services) {
          state.services = action?.payload?.services;
        } else {
          state.services = [];
        }
        if (action?.payload?.reviews) {
          state.reviews = action?.payload?.reviews;
        } else {
          state.reviews = [];
        }
        if (action?.payload?.session) {
          state.session = action?.payload?.session;
        } else {
          state.session = [];
        }
        if (action?.payload?.stripe) {
          state.stripe = action?.payload?.stripe;
        } else {
          state.stripe = [];
        }
      } else {
        state.personal_info = {};
        state.professional_info = {};
        state.user_info = {};
        state.services = [];
        state.reviews = [];
        state.session = [];
        state.stripe = [];
      }
    },
    [UPDATE_PROFESSION_DETAIL_BY_ID.pending]: (state, action) => {
      state.loading = true;
    },
    [UPDATE_PROFESSION_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode === 200) {
        state.profession_info = action.payload.profession;
      }
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.pending]: (state, action) => {
      state.loading = true;
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode === 200) {
        state.personal_info = action.payload.data;
      }
    },
    [UPDATE_UserGoal_DETAIL_BY_ID.pending]: (state, action) => {
      state.loading = true;
    },
    [UPDATE_UserGoal_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      state.user_info = action.payload.data;
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
