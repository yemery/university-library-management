import { createSlice } from "@reduxjs/toolkit";
import { mostBorrowedBooks, mostBorrowingStudents, booksAvailability, borrowsStatus,nonReturnedBorrows } from "./statsThunks";

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
  nonReturnedBooksStats : {
    title: "Number of non returned books",
    data: [],
  }
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

    // Get most borrowing students
    builder.addCase(mostBorrowingStudents.fulfilled, (state, action) => {
      state.mostBorrowingStudents.data = action.payload;
    });
    builder.addCase(mostBorrowingStudents.rejected, (action) => {
      console.log("rejected", action);
    });

    // Get books availability
    builder.addCase(booksAvailability.fulfilled, (state, action) => {
      state.booksAvailability.data = action.payload;
    });
    builder.addCase(booksAvailability.rejected, (action) => {
      console.log("rejected", action);
    });

    // Get borrows status
    builder.addCase(borrowsStatus.fulfilled, (state, action) => {
      state.borrowsStatus.data = action.payload;
    });
    builder.addCase(borrowsStatus.rejected, (action) => {
      console.log("rejected", action);
    });
    builder.addCase(nonReturnedBorrows.fulfilled, (state, action) => {
      state.nonReturnedBooksStats.data = action.payload;  
    });
  },
});

export default statsSlice.reducer;
