// /src/components/product/ProductList.jsx
import PropTypes from 'prop-types';
import ProductCard from './ProductCard.jsx';
import Spinner from '../common/Spinner.jsx';

const ProductList = ({ products, loading, error, onAddToCart, isAdmin, onEdit, onDelete }) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>;
  }

  if (!products.length) {
    return (
      <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-700">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="mt-2">Try adjusting your search or category filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

ProductList.defaultProps = {
  loading: false,
  error: null,
  isAdmin: false,
  onEdit: () => {},
  onDelete: () => {}
};

export default ProductList;
