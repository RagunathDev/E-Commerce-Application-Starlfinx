// /src/hooks/useCoupon.js
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCoupon as applyCouponAction, removeCoupon as removeCouponAction, validateCoupon as validateCouponThunk } from '../redux/slices/couponSlice.js';
import { COUPON_CODES } from '../utils/constants.js';

export const useCoupon = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon);
  const [message, setMessage] = useState(null);

  const activeCoupon = useMemo(() => (coupon.applied ? coupon : null), [coupon]);

  const validateAndApply = useCallback(
    ({ code, subtotal }) => {
      const normalizedCode = code.trim().toUpperCase();
      if (!normalizedCode) {
        setMessage({ type: 'error', text: 'Enter a coupon code to apply.' });
        return;
      }

      const couponMatch = COUPON_CODES.find((item) => item.code === normalizedCode);
      if (!couponMatch) {
        setMessage({ type: 'error', text: 'Coupon code does not exist.' });
        return;
      }

      const expiryDate = new Date(couponMatch.expiry);
      if (expiryDate < new Date()) {
        setMessage({ type: 'error', text: 'This coupon has expired.' });
        return;
      }

      if (subtotal < couponMatch.minCartValue) {
        setMessage({ type: 'error', text: `Minimum cart value ₹${couponMatch.minCartValue} required.` });
        return;
      }

      dispatch(applyCouponAction(couponMatch));
      setMessage({ type: 'success', text: `Coupon ${couponMatch.code} applied successfully.` });
    },
    [dispatch]
  );

  const applyCoupon = useCallback(
    (code, subtotal) => {
      return dispatch(validateCouponThunk(code))
        .unwrap()
        .then((couponData) => {
          if (subtotal < couponData.minCartValue) {
            setMessage({ type: 'error', text: `Minimum cart value ₹${couponData.minCartValue} required.` });
            return;
          }
          dispatch(applyCouponAction(couponData));
          setMessage({ type: 'success', text: `Coupon ${couponData.code} applied successfully.` });
        })
        .catch((error) => {
          setMessage({ type: 'error', text: error });
        });
    },
    [dispatch]
  );

  const removeCoupon = useCallback(() => {
    dispatch(removeCouponAction());
    setMessage({ type: 'success', text: 'Coupon removed.' });
  }, [dispatch]);

  return {
    coupon: activeCoupon,
    loading: coupon.loading,
    error: coupon.error,
    message,
    setMessage,
    validateAndApply,
    applyCoupon,
    removeCoupon
  };
};
