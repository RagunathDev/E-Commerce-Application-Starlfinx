// /src/hooks/useCart.js
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem as addItemAction, removeItem as removeItemAction, updateQuantity as updateQuantityAction, clearCart as clearCartAction } from '../redux/slices/cartSlice.js';
import { calculateDiscount, calculateTax, calculateTotal, getSubtotal } from '../utils/priceCalculator.js';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.coupon);

  const subtotal = useMemo(() => getSubtotal(items), [items]);
  const tax = useMemo(() => calculateTax(subtotal), [subtotal]);
  const discount = useMemo(() => calculateDiscount(subtotal, coupon.applied ? coupon : null), [subtotal, coupon]);
  const total = useMemo(() => calculateTotal(subtotal, tax, discount), [subtotal, tax, discount]);

  const addItem = useCallback((product) => {
    dispatch(addItemAction(product));
  }, [dispatch]);

  const removeItem = useCallback((id) => {
    dispatch(removeItemAction(id));
  }, [dispatch]);

  const updateQty = useCallback((id, quantity) => {
    dispatch(updateQuantityAction({ id, quantity }));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return {
    items,
    coupon,
    subtotal,
    tax,
    discount,
    total,
    addItem,
    removeItem,
    updateQty,
    clearCart
  };
};
