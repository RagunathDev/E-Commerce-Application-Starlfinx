// /src/components/cart/CartItem.jsx
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleDecrease = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-[2fr_1fr_1fr]">
      <div className="flex items-center gap-4">
        <img src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
        <div>
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <p className="text-sm text-slate-500">₹{item.price} each</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-2">
        <Button onClick={handleDecrease} disabled={item.quantity <= 1} variant="secondary">−</Button>
        <span className="px-3 text-sm font-semibold text-slate-900">{item.quantity}</span>
        <Button onClick={handleIncrease} disabled={item.quantity >= 99} variant="secondary">+</Button>
      </div>
      <div className="flex flex-col items-end justify-between text-right">
        <p className="text-sm text-slate-500">Line total</p>
        <p className="text-lg font-semibold text-slate-900">₹{item.price * item.quantity}</p>
        <button type="button" onClick={() => onRemove(item.id)} className="text-sm font-medium text-red-600 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    quantity: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired
};

export default CartItem;
