import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUsers = createAsyncThunk("users-info/", async (params) => {
  const response = await api.get("users-info/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    params: params,
  });
  return response.data;
});

const deleteUser = createAsyncThunk("delete-user/", async (id) => {
  const response = await api.delete(`delete-user/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const updateUserPwd = createAsyncThunk("admin-update-pwd/", async (data) => {
  const response = await api.patch(`update-user/${data.id}/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

const addUser = createAsyncThunk("register/", async (data) => {
  const response = await api.post("register/", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return response.data;
});

export { getUsers, deleteUser, updateUserPwd, addUser };
