// /src/pages/ProductListPage.jsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCart } from '../hooks/useCart.js';
import { useProducts } from '../hooks/useProducts.js';
import ProductList from '../components/product/ProductList.jsx';
import Button from '../components/common/Button.jsx';
import ProductForm from '../components/product/ProductForm.jsx';

const ProductListPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const { items, filteredProducts, categories, loadAllProducts, loading, error, adminMode, toggleAdmin, createProduct, updateProduct, deleteProductById } = useProducts(search, category);
  const { addItem } = useCart();

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
  }, []);

  const handleDelete = useCallback((id) => {
    deleteProductById(id);
  }, [deleteProductById]);

  const handleSave = useCallback((data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data).then(() => setEditingProduct(null));
    } else {
      createProduct(data);
    }
  }, [createProduct, editingProduct, updateProduct]);

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const visibleProducts = useMemo(() => filteredProducts, [filteredProducts]);

  return (
    <main className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">Search, filter, and manage store inventory from one dashboard.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={toggleAdmin}>{adminMode ? 'Exit Admin' : 'Admin Mode'}</Button>
        </div>
      </div>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.4fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name" className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <ProductList products={visibleProducts} loading={loading} error={error} onAddToCart={addItem} isAdmin={adminMode} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Inventory</h2>
            <p className="mt-2 text-sm text-slate-500">{items.length} products available across {categories.length} categories.</p>
          </div>
          {adminMode && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Product management</h2>
              <ProductForm initialValues={editingProduct || {}} onSubmit={handleSave} loading={loading} />
              {editingProduct && (
                <button type="button" onClick={handleCancel} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Cancel edit</button>
              )}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default ProductListPage;
