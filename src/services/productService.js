// /src/services/productService.js
import axiosInstance from './axiosInstance.js';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data.products;
};

export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.product;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/products', productData);
  return response.data.product;
};

export const updateProduct = async (id, updates) => {
  const response = await axiosInstance.patch(`/products/${id}`, updates);
  return response.data.product;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data.success;
};
