import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
const initialState = {
  // later we will add the user objectt using decrpyt jwt token
  user: {},
  isAuthenticated: localStorage.getItem("access") ? true : false,
  role: localStorage.getItem("role") || "",
};

export const authenticate = createAsyncThunk("auth/login", async (data) => {
  const response = await api.post("login/", data);
  if (response.status == 200) {
    return response.data;
  }
  return response.status;
});
// logout thunk
export const logout = createAsyncThunk("auth/logout", async () => {
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
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
    });
  },
});

// export const { checkLogin } = authSlice.actions;
export default authSlice.reducer;
