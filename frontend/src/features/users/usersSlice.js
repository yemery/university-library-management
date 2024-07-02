import { createSlice } from "@reduxjs/toolkit";
import { getUsers, deleteUser, updateUserPwd } from "./usersThunks";
// import { act } from "react";

const initialState = {
    users: [],
    totalPages: 0,
    userID: 0,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        targetUserID: (state, action) => {
            state.userID = action.payload;
        }
    },
    extraReducers: (builder) => {

        // Get all users
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.totalPages = action.payload.total_pages;
        });
        builder.addCase(getUsers.rejected, (action) => {
            console.log("rejected", action);
        });

        // Delete user
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.users = state.users.filter((user) => user.id != state.userID);
        });
        builder.addCase(deleteUser.rejected, (action) => {
            console.log("rejected", action);
        });

        // Update user password
        builder.addCase(updateUserPwd.fulfilled, (state) => {
            console.log("Password updated successfully");
        });
        builder.addCase(updateUserPwd.rejected, (action) => {
            console.log("rejected", action);
        });
    },
});

export const { targetUserID } = usersSlice.actions;
export default usersSlice.reducer;