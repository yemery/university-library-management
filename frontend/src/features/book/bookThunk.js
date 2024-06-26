import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../services/api';

const postBook = createAsyncThunk('books/postBook', async (data) => {
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

export {postBook};