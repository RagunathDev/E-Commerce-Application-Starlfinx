// /src/services/couponService.js
import axiosInstance from './axiosInstance.js';

export const validateCoupon = async (code) => {
  const response = await axiosInstance.post('/coupons/validate', { code });
  return response.data.coupon;
};
