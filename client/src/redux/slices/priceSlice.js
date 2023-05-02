import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
    name:"Price",
    initialState:{
        data:null
    },
    reducers:{
        addGrandTotal: (state,action)=>{
            
            state.data = action.payload;
        }
    }
})

export const {addGrandTotal} = priceSlice.actions;

export default priceSlice.reducer;