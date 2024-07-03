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

const importUsers = createAsyncThunk("import-users/", async (data) => {
  const response = await api.post("import-users/", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

const exportUsers = createAsyncThunk("export-users/", async (params, {}) => {
  try {
    const response = await api.get("export-users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      params: params,
      responseType: "blob",
    });

    // blob is an object representing a file-like object containing raw data
    const blob = new Blob([response.data], { type: response.data.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Set the download attribute to a default filename or derive it from response headers or other sources
    link.download = "exported_users.csv";
    document.body.appendChild(link);
    link.click(); // trigger download
    document.body.removeChild(link); // clean up
    URL.revokeObjectURL(url); // free up memory
    return blob;
  } catch (error) {
    console.log(error);
  }
});

export {
  getUsers,
  deleteUser,
  updateUserPwd,
  addUser,
  importUsers,
  exportUsers,
};
