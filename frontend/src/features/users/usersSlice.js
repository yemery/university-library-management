import { createSlice } from "@reduxjs/toolkit";
import { getUsers, deleteUser, updateUserPwd, addUser, importUsers } from "./usersThunks";

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

        // Add user
        builder.addCase(addUser.fulfilled, (state, action) => {
            // state.users=action.payload;
            // state.users.push(action.payload);
        });
        builder.addCase(addUser.rejected, (action) => {
            console.log("rejected", action);
        });

        // Import users
        builder.addCase(importUsers.fulfilled, (state,action) => {
            console.log("Users imported successfully");
            // return reposnse data
            // console.log(action.payload)
            // return action.payload;
        });
        builder.addCase(importUsers.rejected, (action) => {
            console.log("rejected", action);
        });
    },
});

export const { targetUserID } = usersSlice.actions;
export default usersSlice.reducer;