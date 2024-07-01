import { createSlice } from "@reduxjs/toolkit";
import {
  mostBorrowedBooks,
  mostBorrowingStudents,
  booksAvailability,
  borrowsStatus,
  nonReturnedBorrows,
  ownBorrowsStats,
  ownBorrowedStatus,
  onwNonReturnedBorrows
} from "./statsThunks";

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
  nonReturnedBooksStats: {
    title: "Number of non returned books",
    data: [],
  },
  ownBorrowedBooks: {
    title: "My borrowed books",
    data: 0,
  },
  myBorrows : {
    title: "My borrowed status",
    data: [],
  },
  nonReturnedBorrows: {
    title: "My non returned books",
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

    // get own borrows count stat
    builder.addCase(ownBorrowsStats.fulfilled, (state, action) => {
      state.ownBorrowedBooks.data = action.payload;
    });
    builder.addCase(ownBorrowsStats.rejected, (action) => {
      console.log("rejected", action);
    });

    // get own borrows number status
    builder.addCase(ownBorrowedStatus.fulfilled, (state, action) => {
      state.myBorrows.data = action.payload;
    });
    builder.addCase(ownBorrowedStatus.rejected, (action) => {
      console.log("rejected", action);
    });
    
    // get own non returned borrows count
    builder.addCase(onwNonReturnedBorrows.fulfilled, (state, action) => {
      state.nonReturnedBorrows.data = action.payload;
    });
    builder.addCase(onwNonReturnedBorrows.rejected, (action) => {
      console.log("rejected", action);
    });
    
  },
});

export default statsSlice.reducer;
