import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const borrowsList = createAsyncThunk("borrows/", async (params) => {
  const response = await api.get("borrows/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    params: params,
  });
  return response.data;
});

const confirmBorrow = createAsyncThunk("/borrows/confirm", async (id) => {
  const response = await api.patch(`borrows/confirm/${id}/`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const cancelBorrow = createAsyncThunk("/borrows/cancel", async (id) => {
  const response = await api.patch(`borrows/cancel/${id}/`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const borrowABook = createAsyncThunk("/borrows/borrow", async (id) => {
  const response = await api.post(
    `borrow/`,
    { book: id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  return response.data;
});



// const waitlistABook = createAsyncThunk("/borrows/waitlist", async (id) => {
//   const response = await api.post(`waitlist/`, {
//     book: id,
//   }, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     },
//   });
//   return response.data;
// });

const studentBorrows = createAsyncThunk("/borrows/user/", async (params) => {
  const response = await api.get(`borrows/user/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    params: params,
  });
  return response.data;
});

export {
  borrowsList,
  confirmBorrow,
  cancelBorrow,
  borrowABook,
  studentBorrows,
};
