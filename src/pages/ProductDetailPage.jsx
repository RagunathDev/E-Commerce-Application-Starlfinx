// /src/pages/ProductDetailPage.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useProducts } from '../hooks/useProducts.js';
import ProductDetail from '../components/product/ProductDetail.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { selectedProduct, loadProduct, loading, error } = useProducts();

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id, loadProduct]);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <ProductDetail product={selectedProduct} loading={loading} error={error} onAddToCart={addItem} />
    </main>
  );
};

export default ProductDetailPage;
