import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import site from "../../config/api";

export const fetchProducts = createAsyncThunk("fetchProducts", async()=>{
     const response = await axios.get(`${site}/api/product/cake`)
     return response.data;
})

const productSlice = createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.pending, (state,action)=>{
               state.isLoading  = true;
        })

        builder.addCase(fetchProducts.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.data = action.payload;
        })

        builder.addCase(fetchProducts.rejected, (state,action)=>{
            state.isError = true;
        })
    }
})

export default productSlice.reducer;