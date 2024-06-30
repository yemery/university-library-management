import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const mostBorrowedBooks = createAsyncThunk(
  "borrows/most-borrowed",
  async () => {
    const response = await api.get("borrows/most-borrowed/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  }
);

export { mostBorrowedBooks };
