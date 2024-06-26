import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../services/api';
const initialState = {
    books:[],

};
// post book thunk
export const postBook = createAsyncThunk('books/postBook', async (data) => {
    const response = await api.post('books/create/', data,{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('access')}`
        }    
    });
    if(response.status == 201){
        return response.data;
    }
    return response.status;
});

const bookSlice = createSlice({
name:'books',
initialState,
reducers:{},
extraReducers:(builder) => {
    builder.addCase(postBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
    });
    builder.addCase(postBook.rejected, (state, action) => {
        console.log('rejected', action);
    });
}

});
export default bookSlice.reducer;
