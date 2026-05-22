// /src/components/cart/CartSummary.jsx
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const CartSummary = ({ subtotal, tax, discount, total, coupon, onClearCoupon, onProceed }) => (
  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
    <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
    <div className="space-y-3 text-sm text-slate-600">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>GST (18%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      {coupon && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <span>Discount ({coupon.code})</span>
          <div className="flex items-center gap-2">
            <span>−₹{discount.toFixed(2)}</span>
            <button type="button" onClick={onClearCoupon} className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-200">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
      <span>Total</span>
      <span>₹{total.toFixed(2)}</span>
    </div>
    <Button type="button" className="w-full" onClick={onProceed}>Proceed to checkout</Button>
  </div>
);

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  coupon: PropTypes.object,
  onClearCoupon: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired
};

CartSummary.defaultProps = {
  coupon: null
};

export default CartSummary;
