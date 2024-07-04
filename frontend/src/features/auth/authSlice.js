import { createSlice } from "@reduxjs/toolkit";
import { authenticate, logout, updatePassword, getUserInfo } from "./authThunks";

const initialState = {
  // later we will add the user objectt using decrpyt jwt token
  user: null,
  isAuthenticated: localStorage.getItem("access") ? true : false,
  role: localStorage.getItem("role") || "",

  // update password
  updatePwd: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // checkLogin(state) {
    //     state.isAuthenticated && state.role != "" ? true : false;
    // }
  },
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
      return initialState;
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
      state.user = null;
    });

  },
});

export default authSlice.reducer;
