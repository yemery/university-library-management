import { act } from "react";
import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const postBook = createAsyncThunk("books/postBook", async (data) => {
  const response = await api.post("books/create/", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (response.status == 201) {
    return response.data;
  }
  return response.status;
});

const booksList = createAsyncThunk("books/", async (params)=> {
  const response = await api.get("books/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    params: params,
  });
  return response.data;
});

const updateBook = createAsyncThunk("books/update/", async (data) => {
  const response = await api.patch(`books/update/${data.id}/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const deleteBook = createAsyncThunk("books/delete/", async (id) => {
  const response = await api.delete(`books/delete/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.status;
});

export { postBook, booksList, updateBook, deleteBook };
