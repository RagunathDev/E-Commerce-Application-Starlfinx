// /src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice.js';
import cartReducer from './slices/cartSlice.js';
import authReducer from './slices/authSlice.js';
import couponReducer from './slices/couponSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    coupon: couponReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});
