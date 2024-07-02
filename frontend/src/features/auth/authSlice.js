import { createSlice } from "@reduxjs/toolkit";
import { authenticate, logout, updatePassword } from "./authThunks";

const initialState = {
  // later we will add the user objectt using decrpyt jwt token
  user: {},
  isAuthenticated: localStorage.getItem("access") ? true : false,
  role: localStorage.getItem("role") || "",

  response: {
    type: "",
    message: "",
  },
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
      state.response = {
        type: "success",
        message: "Logged in successfully",
      };
    });

    builder.addCase(authenticate.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};

      state.response.type = "error";
      // if action.error.message contains 401 is unauthorized else it is server error
      action.error.message.includes("401")
        ? (state.response.message = "Invalid credentials")
        : (state.response.message = "Something went wrong");
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.role = "";
      localStorage.clear();
    });

    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.response = {
        type: action.payload.status == 200 ? "success" : "error",
        message: action.payload.message,
      };
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.response = {
        type: "error",
        message: action.error.message.includes("400")
          ? "Credentials provided for update are invalid"
          : "Something went wrong. Aborting update process",
      };
    });
  },
});

export default authSlice.reducer;
