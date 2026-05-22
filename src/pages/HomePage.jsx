// /src/pages/HomePage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useProducts } from '../hooks/useProducts.js';
import ProductList from '../components/product/ProductList.jsx';
import Button from '../components/common/Button.jsx';

const HomePage = () => {
  const { addItem } = useCart();
  const { filteredProducts, loadAllProducts, loading, error } = useProducts();

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  const featuredProducts = filteredProducts.slice(0, 4);

  return (
    <main className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 p-10 text-white shadow-card lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-200">E-commerce experience</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight">Shop premium essentials with fast checkout and intelligent coupons.</h1>
          <p className="max-w-xl text-sm leading-7 text-slate-200">Explore curated collections, manage your cart, and complete secure orders from a responsive React storefront.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/products">
              <Button>Browse products</Button>
            </Link>
            <Link to="/cart">
              <Button variant="secondary">View cart</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6 text-slate-900 shadow-xl">
          <h2 className="text-lg font-semibold">Top picks</h2>
          <div className="mt-6 space-y-4">
            {loading ? <p>Loading products...</p> : featuredProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">₹{product.price}</p>
                  </div>
                  <button type="button" onClick={() => addItem(product)} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Shop all products</h2>
            <p className="text-sm text-slate-500">Fast shipping, intuitive cart, and smart coupon support.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">See all products →</Link>
        </div>
        <ProductList products={featuredProducts} loading={loading} error={error} onAddToCart={addItem} />
      </section>
    </main>
  );
};

export default HomePage;
