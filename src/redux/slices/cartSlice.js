// /src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity = Math.min(99, existing.quantity + 1);
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((line) => line.id === id);
      if (!item) return;
      item.quantity = Math.max(1, Math.min(99, quantity));
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
