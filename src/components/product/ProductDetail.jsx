// /src/components/product/ProductDetail.jsx
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx';

const ProductDetail = ({ product, loading, error, onAddToCart }) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>;
  }

  if (!product) {
    return <div className="rounded-3xl bg-slate-50 p-6 text-slate-700">Product not found.</div>;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <img src={product.imageUrl} alt={product.name} className="h-96 w-full rounded-3xl object-cover" />
      </div>
      <div className="space-y-6 rounded-3xl bg-white p-6 shadow-card">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-600">{product.category}</p>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-slate-900">₹{product.price}</p>
        </div>
        <p className="text-sm leading-7 text-slate-600">{product.description}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500">Stock available: {product.stock}</span>
          <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    stock: PropTypes.number
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired
};

ProductDetail.defaultProps = {
  loading: false,
  error: null,
  product: null
};

export default ProductDetail;
