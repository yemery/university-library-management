import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const authenticate = createAsyncThunk("auth/login", async (data) => {
  const response = await api.post("login/", data);
  if (response.status == 200) {
    return response.data;
  }
  return response.status;
});

const logout = createAsyncThunk("auth/logout", async () => {
  const response = await api.post(
    "logout-user/",
    {
      // later well add the token in backend httponly cookie
      refresh: localStorage.getItem("refresh"),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );

  return response.status;
});

const updatePassword = createAsyncThunk("update-pwd/", async (data) => {
  const response = await api.post("update-pwd/", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    data,
  });

  return { status: response.status, message: response.data.message };
});

export { authenticate, logout, updatePassword };
