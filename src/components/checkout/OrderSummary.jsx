// /src/components/checkout/OrderSummary.jsx
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const OrderSummary = ({ items, subtotal, tax, discount, total, coupon, onPlaceOrder, isPlacing }) => (
  <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
    <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
    <div className="space-y-3 text-sm text-slate-600">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p>Qty {item.quantity}</p>
          </div>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
      <div className="flex justify-between border-t border-slate-200 pt-3">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>GST (18%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      {coupon && (
        <div className="flex justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <span>Discount ({coupon.code})</span>
          <span>−₹{discount.toFixed(2)}</span>
        </div>
      )}
    </div>
    <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
      <span>Total</span>
      <span>₹{total.toFixed(2)}</span>
    </div>
    <Button onClick={onPlaceOrder} disabled={isPlacing} className="w-full">
      {isPlacing ? 'Placing order...' : 'Place Order'}
    </Button>
  </div>
);

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  coupon: PropTypes.object,
  onPlaceOrder: PropTypes.func.isRequired,
  isPlacing: PropTypes.bool
};

OrderSummary.defaultProps = {
  coupon: null,
  isPlacing: false
};

export default OrderSummary;
