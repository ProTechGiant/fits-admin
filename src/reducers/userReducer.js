import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

import { fetch3, fetch2 } from "./helper/fetch";

const initialState = {
  user: [],
  loading: false,
  isLoading: false,
  success: false,
  trainer: [],
  trainee: [],
  personal_info: {},
  profession_info: {},
  single_class: {},
  user_info: {},
  services: [],
  user_classes: [],
  reviews: [],
  session: [],
  stripe: {},
  customer: {},
  transaction_history_users: [],
  user_transaction_history: [],
  suspended_account_data: [],
  transaction_history_recharge: [],
  transaction_history_refund: [],
  transaction_history_booking: [],
};

export const GET_USER_DATA = createAsyncThunk("getUser", async () => {
  const result = await fetch3(`${baseUrl}/api/admin/users`, "get");
  return result;
});

export const GET_USER_DETAIL_BY_ID = createAsyncThunk(
  "getUserDetails",
  async (id) => {
    const result = await fetch3(`${baseUrl}/api/user/${id}`, "get");

    return result;
  }
);

export const GET_CLASS_BY_ID = createAsyncThunk("getClassById", async (id) => {
  const result = await fetch3(`${baseUrl}/api/admin/classes/${id}`, "get");

  return result;
});

export const UPDATE_CLASS_BY_ID = createAsyncThunk(
  "updateClassById",
  async ({ id, body }) => {
    const result = await fetch2(
      `${baseUrl}/api/admin/classes/${id}`,
      body,
      "put"
    );
    return result;
  }
);

export const UPDATE_PROFESSION_DETAIL_BY_ID = createAsyncThunk(
  "updateProfessionDetail",
  async (id1) => {
    const { id, experience_note, experience_year, qualification } = id1;

    const result = await fetch2(
      `${baseUrl}/api/profession/${id}`,
      { experience_note, experience_year, qualification },
      "put"
    );
    return result;
  }
);

export const handleTransactionsCustomer = createAsyncThunk(
  "handleTransactionsCustomer",
  async (id) => {
    const result = await fetch3(
      `${baseUrl}/api/stripe/customer/checkBalanceTransactions/${id}`,
      "post"
    );
    return result;
  }
);

export const transactionHistory = createAsyncThunk(
  "transactionHistory",
  async (id1) => {
    const { create, id, type } = id1;
    const created = parseInt(create);
    console.log("created", created);
    const result = await fetch2(
      `${baseUrl}/api/stripe/customer/BalanceTransactionDetail/${id}`,
      { created, type },
      "post"
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
      user,
    } = id1;

    const result = await fetch2(
      `${baseUrl}/api/personal/${id}`,
      {
        gender,
        name,
        country,
        city,
        state,
        date_of_birth,
        profileImage,
        user,
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
      `${baseUrl}/api/fitness/${id}`,
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

export const SUSPEND_ACCOUNT = createAsyncThunk(
  "suspendAccount",
  async (data) => {
    const result = await fetch2(
      `${baseUrl}/api/user/suspended/${data._id}`,
      { suspended: !data.suspended },
      "put"
    );
    return result;
  }
);
export const UPDATE_USER_PASSWORD = createAsyncThunk(
  "updateUserPassword",
  async (data) => {
    const result = await fetch2(
      `${baseUrl}/api/admin/update/user/password/${data.data._id}`,
      { password: data.password },
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
        if (action?.payload?.user_classes) {
          state.user_classes = action?.payload?.user_classes;
        } else {
          state.user_classes = [];
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
    [UPDATE_CLASS_BY_ID.pending]: (state) => {
      state.isLoading = true;
    },
    [UPDATE_CLASS_BY_ID.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.statusCode === 200) {
        state.updated_class = action.payload;
        state.success = true;
      }
    },
    [UPDATE_CLASS_BY_ID.rejected]: (state, action) => {
      state.isLoading = false;
      state.success = false;
    },

    [GET_CLASS_BY_ID.fulfilled]: (state, action) => {
      if (action.payload.statusCode === 200) {
        state.single_class = action.payload;
      }
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.pending]: (state) => {
      state.loading = true;
    },
    [UPDATE_PERSONAL_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode === 200) {
        state.personal_info = action.payload.data;
      }
    },

    [UPDATE_UserGoal_DETAIL_BY_ID.pending]: (state) => {
      state.loading = true;
    },
    [UPDATE_UserGoal_DETAIL_BY_ID.fulfilled]: (state, action) => {
      state.loading = false;
      state.user_info = action.payload.data;
    },

    [SUSPEND_ACCOUNT.pending]: (state) => {
      state.loading = true;
    },
    [SUSPEND_ACCOUNT.fulfilled]: (state, action) => {
      state.loading = false;
      state.suspended_account_data = action.payload;
    },

    [handleTransactionsCustomer.fulfilled]: (state, action) => {
      state.transaction_history_recharge = action.payload.data.filter(
        (item) => item.type === "recharge"
      );
      state.transaction_history_booking = action.payload.data.filter(
        (item) => item.type === "booking"
      );
      state.transaction_history_refund = action.payload.data.filter(
        (item) => item.type === "refund"
      );
    },
    [transactionHistory.fulfilled]: (state, action) => {
      const data = {
        infoTransferUser: action.payload.data?.infoTransferUser,
      };
      state.user_transaction_history = data;
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
