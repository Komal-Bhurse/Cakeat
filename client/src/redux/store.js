import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from "./slices/productSlice"
import userReducer from "./slices/userSlice"
import priceReducer from "./slices/priceSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        product: productReducer,
        user: userReducer,
        price:priceReducer
    },
})