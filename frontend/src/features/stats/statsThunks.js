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

const mostBorrowingStudents = createAsyncThunk(
  "borrows/most-students/",
  async () => {
    const response = await api.get("borrows/most-students/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  }
);

const booksAvailability = createAsyncThunk("books/availability/", async () => {
  const response = await api.get("books/availability/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const borrowsStatus = createAsyncThunk("borrows/status/", async () => {
  const response = await api.get("borrows/status/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});
const nonReturnedBorrows = createAsyncThunk(
  "/borrows/non-returned/",
  async () => {
    const response = await api.get("borrows/non-returned/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  }
);

const ownBorrowsStats = createAsyncThunk("borrows/my-borrows", async () => {
  const response = await api.get("borrows/borrowed-books/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});
const ownBorrowedStatus = createAsyncThunk("borrows/my-borrows-status", async () => {
  const response = await api.get("borrows/by-status/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const onwNonReturnedBorrows=createAsyncThunk("borrows/my-non-returned",async()=>{
  const response = await api.get("borrows/own-non-returned/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
})


export {
  mostBorrowedBooks,
  mostBorrowingStudents,
  booksAvailability,
  borrowsStatus,
  nonReturnedBorrows,
  ownBorrowsStats,
  ownBorrowedStatus,
  onwNonReturnedBorrows
};
