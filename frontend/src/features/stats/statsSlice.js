import { createSlice } from "@reduxjs/toolkit";
import { mostBorrowedBooks } from "./statsThunks";

const initialState = {
  mostBorrowedBooks: {
    title: "most borrowed books",
    data: [],
  },
  mostBorrowingStudents: {
    title: "most borrowing students",
    data: [],
  },
  booksAvailability: {
    title: "books availability",
    data: [],
  },
  borrowsStatus: {
    title: "borrows status",
    data: [],
  },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  extraReducers: (builder) => {
    // Get most borrowed books
    builder.addCase(mostBorrowedBooks.fulfilled, (state, action) => {
      state.mostBorrowedBooks.data = action.payload;
    });
    builder.addCase(mostBorrowedBooks.rejected, (action) => {
      console.log("rejected", action);
    });
  },
});

export default statsSlice.reducer;
