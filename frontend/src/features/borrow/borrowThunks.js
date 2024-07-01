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

const studentBorrows = createAsyncThunk("/borrows/user/", async (params) => {
  const response = await api.get(`borrows/user/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    params: params,
  });
  return response.data;
});

const waitingListBook = createAsyncThunk("waiting-list/", async (id) => {
  const response = await api.post(
    "waiting-list/",
    { book: id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
});

const updateBorrowRecord=createAsyncThunk("borrows/update",async (data)=>{
  const response=await api.patch(`borrows/update/${data.id}/`,data,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    }
  });
  return response.data;
});



export {
  borrowsList,
  confirmBorrow,
  cancelBorrow,
  borrowABook,
  studentBorrows,
  waitingListBook,
  updateBorrowRecord
};
