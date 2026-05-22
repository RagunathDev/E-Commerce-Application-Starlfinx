// /src/components/product/ProductCard.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

const ProductCard = ({ product, onAddToCart, isAdmin, onEdit, onDelete }) => (
  <article className="group overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
    <Link to={`/product/${product.id}`} className="block overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" />
    </Link>
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        <Badge color="slate">{product.category}</Badge>
      </div>
      <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
        <span className="text-sm text-slate-500">Stock {product.stock}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
        {isAdmin && (
          <>
            <Button variant="secondary" onClick={() => onEdit(product)}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
          </>
        )}
      </div>
    </div>
  </article>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    stock: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

ProductCard.defaultProps = {
  isAdmin: false,
  onEdit: () => {},
  onDelete: () => {}
};

export default ProductCard;
