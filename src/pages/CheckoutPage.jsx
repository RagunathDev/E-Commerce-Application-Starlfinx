// /src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import CheckoutForm from '../components/checkout/CheckoutForm.jsx';
import OrderSummary from '../components/checkout/OrderSummary.jsx';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, tax, discount, total, coupon, clearCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedItems, setPlacedItems] = useState([]);

  const handlePlaceOrder = async (formData) => {
    setPlacingOrder(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPlacedItems(items);
    clearCart();
    setPlacingOrder(false);
    setOrderSuccess(true);
    setTimeout(() => navigate('/'), 2800);
  };

  if (!items.length && !orderSuccess) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-700">
          <h1 className="text-2xl font-semibold">No items in cart</h1>
          <p className="mt-2">Add products to your cart before checking out.</p>
        </div>
      </main>
    );
  }

  if (orderSuccess) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-blue-700 to-indigo-600 p-8 text-white shadow-2xl shadow-blue-800/20">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-200">Order confirmed</p>
                  <h1 className="mt-4 text-4xl font-bold">Your order is on the way!</h1>
                </div>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-3xl shadow-lg shadow-slate-900/10">✅</div>
              </div>
              <div className="grid gap-4 rounded-3xl bg-white/10 p-6 text-slate-100 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Order number</p>
                  <p className="mt-3 text-xl font-semibold">SFLX-{Date.now().toString().slice(-6)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Estimated delivery</p>
                  <p className="mt-3 text-xl font-semibold">2 - 4 business days</p>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 text-slate-100">
                <h2 className="text-lg font-semibold">Order snapshot</h2>
                <div className="mt-4 space-y-3 text-sm leading-6">
                  {(orderSuccess ? placedItems : items).map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm text-slate-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>−₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-white">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-200">Thanks for shopping with Starlfinx — your order is being prepared.</p>
                <button type="button" onClick={() => navigate('/')} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">Complete your order by providing delivery details.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <CheckoutForm onSubmit={handlePlaceOrder} loading={placingOrder} />
        <OrderSummary items={items} subtotal={subtotal} tax={tax} discount={discount} total={total} coupon={coupon} onPlaceOrder={() => {}} isPlacing={placingOrder} />
      </div>
    </main>
  );
};

export default CheckoutPage;
