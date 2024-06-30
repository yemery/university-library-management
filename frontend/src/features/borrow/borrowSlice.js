import { createSlice } from "@reduxjs/toolkit";
import {
  borrowsList,
  confirmBorrow,
  cancelBorrow,
  studentBorrows,
} from "./borrowThunks";

const initialState = {
  borrows: [],
  borrowID: 0,
  borrow: {},
  totalPages: 0,
};

// helper function
const updateBorrow = (state, action) => {
  const index = state.borrows.findIndex(
    (borrow) => borrow.id === action.payload.id
  );
  if (index !== -1) {
    state.borrows[index] = action.payload;
  }
};

const borrowSlice = createSlice({
  name: "borrows",
  initialState,
  reducers: {
    targetBorrowID: (state, action) => {
      state.borrowID = action.payload;
    },
    targetBorrow: (state, action) => {
      state.borrow = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Get all borrows
    builder.addCase(borrowsList.fulfilled, (state, action) => {
      state.borrows = action.payload.borrows;
      state.totalPages = action.payload.total_pages;
    });
    builder.addCase(borrowsList.rejected, (action) => {
      console.log("rejected", action);
    });

    // Confirm a borrow
    builder.addCase(confirmBorrow.fulfilled, (state, action) => {
      updateBorrow(state, action);
    });

    // Cancel a borrow
    builder.addCase(cancelBorrow.fulfilled, (state, action) => {
      updateBorrow(state, action);
    });

    // Get a student's borrows
    builder.addCase(studentBorrows.fulfilled, (state, action) => {
      state.borrows = action.payload.borrows;
      state.totalPages = action.payload.total_pages;
    });
    builder.addCase(studentBorrows.rejected, (action) => {
      console.log("rejected", action);
    });
  },
});

export default borrowSlice.reducer;
export const { targetBorrowID, targetBorrow } = borrowSlice.actions;
