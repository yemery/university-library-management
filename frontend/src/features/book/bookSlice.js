import { createSlice } from "@reduxjs/toolkit";
import { postBook, booksList, updateBook, deleteBook } from "./bookThunks";

const initialState = {
  books: [],
  bookID: 0,
  book: {},
  totalPages : 0
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    targetBookID: (state, action) => {
      state.bookID = action.payload;
    },
    targetBook: (state, action) => {
      state.book = action.payload
    },
  },

  extraReducers: (builder) => {
    // Add a new book
    builder.addCase(postBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });
    builder.addCase(postBook.rejected, (action) => {
      console.log("rejected", action);
    });

    // Get all books
    builder.addCase(booksList.fulfilled, (state, action) => {
      state.books = action.payload.books;
      state.totalPages = action.payload.total_pages;
    });
    builder.addCase(booksList.rejected, (action) => {
      console.log("rejected", action);
    });

    // Update a book
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    });

    // Delete a book
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    });
  },
});

export default bookSlice.reducer;
export const { targetBookID, targetBook } = bookSlice.actions;
