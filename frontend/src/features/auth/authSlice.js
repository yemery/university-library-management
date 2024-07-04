import { createSlice } from "@reduxjs/toolkit";
import { authenticate, logout, updatePassword, getUserInfo } from "./authThunks";

const initialState = {
  user: {},
  isAuthenticated: localStorage.getItem("access") ? true : false,
  role: localStorage.getItem("role") || "",

  // update password
  updatePwd: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("role", action.payload.user.role);
    });

    builder.addCase(authenticate.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
      // localStorage.clear();
      state.isAuthenticated = false;
      state.user = {};
      state.role = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      
      console.log(action);
    });

    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.updatePwd = action.payload;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.updatePwd = action.payload;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      localStorage.clear()
    });

  },
});

export default authSlice.reducer;
