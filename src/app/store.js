import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import userReducer from "../reducers/userReducer";
// import forgotPasswordReducer from "../reducers/forgotPasswordReducer";
// import filterReducer from "../reducers/filterReducer";
// import newsLetterReducer from "../reducers/newLetterReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    userData: userReducer,
    // forgotPassword: forgotPasswordReducer,
    // filter: filterReducer,
    // newsLetter: newsLetterReducer,
  },
});
