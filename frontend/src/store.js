import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import bookReducer from "./features/book/bookSlice";
import borrowReducer from "./features/borrow/borrowSlice";
import statsReducer from "./features/stats/statsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    borrows: borrowReducer,
    stats: statsReducer,
  },
});
