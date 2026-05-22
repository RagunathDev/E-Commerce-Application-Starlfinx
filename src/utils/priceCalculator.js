// /src/utils/priceCalculator.js
import { TAX_RATE } from './constants.js';

export const getSubtotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateTax = (subtotal) => Number((subtotal * TAX_RATE).toFixed(2));

export const calculateDiscount = (subtotal, coupon) => {
  if (!coupon || subtotal <= 0) return 0;
  if (coupon.discountType === 'flat') {
    return Math.min(coupon.value, subtotal);
  }
  return Number(((coupon.value / 100) * subtotal).toFixed(2));
};

export const calculateTotal = (subtotal, tax, discount) => {
  return Number(Math.max(0, subtotal + tax - discount).toFixed(2));
};
