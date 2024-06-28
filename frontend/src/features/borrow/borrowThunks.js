import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const borrowsList = createAsyncThunk("borrows/", async () => {
  const response = await api.get("borrows/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
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

export { borrowsList, confirmBorrow, cancelBorrow };
