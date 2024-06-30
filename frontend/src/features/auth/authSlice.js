import { createSlice } from "@reduxjs/toolkit";
import { authenticate, logout, updatePassword } from "./authThunks";

const initialState = {
  // later we will add the user objectt using decrpyt jwt token
  user: {},
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
      // console.log('entered')
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

      console.log("rejected", action);
      // handling error
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.role = "";
      localStorage.clear();
    });

    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.updatePwd = action.payload;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.updatePwd = action.payload;
    });
  },
});

// export const { checkLogin } = authSlice.actions;
export default authSlice.reducer;
