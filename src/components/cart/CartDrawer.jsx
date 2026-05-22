// /src/components/cart/CartDrawer.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';

const CartDrawer = ({ isOpen, items, onClose }) => {
  return (
    <div className={`fixed inset-0 z-40 transition-all ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-slate-900/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold text-slate-900">Cart</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-900">Close</button>
        </div>
        {!items.length && (
          <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-center text-slate-700">
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="mt-2">Browse products to add something special.</p>
            <Link to="/products" onClick={onClose} className="mt-4 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Browse products
            </Link>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="mt-4 flex items-center gap-4 rounded-3xl border border-slate-200 p-4">
            <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-500">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-slate-900">₹{item.price * item.quantity}</span>
          </div>
        ))}
        {items.length > 0 && (
          <div className="mt-6">
            <Link to="/cart" onClick={onClose} className="inline-flex w-full justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
};

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};

export default CartDrawer;
