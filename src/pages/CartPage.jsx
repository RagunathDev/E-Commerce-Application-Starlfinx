// /src/pages/CartPage.jsx
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useCoupon } from '../hooks/useCoupon.js';
import { removeCoupon } from '../redux/slices/couponSlice.js';
import CouponInput from '../components/coupon/CouponInput.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, tax, discount, total, updateQty, removeItem, coupon } = useCart();
  const { validateAndApply, message, setMessage } = useCoupon();

  const handleApplyCoupon = (code) => {
    validateAndApply({ code, subtotal });
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setMessage({ type: 'success', text: 'Coupon removed.' });
  };

  const handleProceed = () => {
    navigate('/checkout');
  };

  const cartContent = useMemo(() => {
    if (!items.length) {
      return (
        <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-700">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2">Add items to your cart from the product gallery.</p>
        </div>
      );
    }

    return items.map((item) => (
      <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQty} />
    ));
  }, [items, removeItem, updateQty]);

  return (
    <main className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Shopping Cart</h1>
        <p className="mt-2 text-sm text-slate-500">Review items, update quantities, apply coupons, and continue to checkout.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-4">{cartContent}</div>
        <aside className="space-y-6">
          <CouponInput onApply={handleApplyCoupon} onRemove={handleRemoveCoupon} coupon={coupon} loading={false} message={message} />
          <CartSummary subtotal={subtotal} tax={tax} discount={discount} total={total} coupon={coupon} onClearCoupon={handleRemoveCoupon} onProceed={handleProceed} />
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
