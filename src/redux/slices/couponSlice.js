// /src/redux/slices/couponSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { validateCoupon as validateCouponService } from '../../services/couponService.js';

const initialState = {
  code: null,
  discountType: null,
  value: 0,
  minCartValue: 0,
  expiry: null,
  loading: false,
  error: null,
  applied: false
};

export const validateCoupon = createAsyncThunk('coupon/validateCoupon', async (code, { rejectWithValue }) => {
  try {
    return await validateCouponService(code);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Coupon validation failed');
  }
});

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon(state, action) {
      const coupon = action.payload;
      state.code = coupon.code;
      state.discountType = coupon.discountType;
      state.value = coupon.value;
      state.minCartValue = coupon.minCartValue;
      state.expiry = coupon.expiry;
      state.applied = true;
      state.error = null;
    },
    removeCoupon(state) {
      state.code = null;
      state.discountType = null;
      state.value = 0;
      state.minCartValue = 0;
      state.expiry = null;
      state.applied = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.discountType = action.payload.discountType;
        state.value = action.payload.value;
        state.minCartValue = action.payload.minCartValue;
        state.expiry = action.payload.expiry;
        state.applied = true;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
