import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCartItems = createAsyncThunk("getAllCartItems",async()=>{
     const cartItems = await axios.get(`http://localhost:5000/api/cart`,{withCredentials:true})
     
      return cartItems.data;
})

const cart = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")):null

const cartSlice = createSlice({
    name: "Cart",
    initialState:{
        isLoading:false,
        data:cart,
        isError:false,
    },
    reducers:{
        cartItems: (state,action)=>{
            state.data = action.payload;
            localStorage.setItem("cartItems",JSON.stringify(action.payload))
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCartItems.pending,(state,action)=>{
            state.isLoading = true;
        })

        builder.addCase(getAllCartItems.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            localStorage.setItem("cartItems",JSON.stringify(action.payload))
        })

        builder.addCase(getAllCartItems.rejected,(state,action)=>{
            state.isError = true;
        })
    },
})

export const  {cartItems} = cartSlice.actions;

export default cartSlice.reducer;