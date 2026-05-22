// /src/hooks/useProducts.js
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchProduct, loadProducts, removeProduct, toggleAdminMode } from '../redux/slices/productsSlice.js';

export const useProducts = (searchTerm = '', category = '') => {
  const dispatch = useDispatch();
  const { items, selectedProduct, loading, error, adminMode } = useSelector((state) => state.products);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return items.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category ? product.category === category : true;
      return matchesName && matchesCategory;
    });
  }, [items, searchTerm, category]);

  const categories = useMemo(() => [...new Set(items.map((product) => product.category))], [items]);

  const loadAllProducts = useCallback(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const loadProduct = useCallback((id) => {
    dispatch(fetchProduct(id));
  }, [dispatch]);

  const createProduct = useCallback((productData) => {
    return dispatch(addProduct(productData));
  }, [dispatch]);

  const updateProduct = useCallback((id, updates) => {
    return dispatch(editProduct({ id, updates }));
  }, [dispatch]);

  const deleteProductById = useCallback((id) => {
    return dispatch(removeProduct(id));
  }, [dispatch]);

  const toggleAdmin = useCallback(() => {
    dispatch(toggleAdminMode());
  }, [dispatch]);

  return {
    items,
    selectedProduct,
    filteredProducts,
    categories,
    loading,
    error,
    adminMode,
    loadAllProducts,
    loadProduct,
    createProduct,
    updateProduct,
    deleteProductById,
    toggleAdmin
  };
};
