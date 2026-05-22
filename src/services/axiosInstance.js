// /src/services/axiosInstance.js
import axios from 'axios';
import { API_BASE_URL, PRODUCTS, COUPON_CODES } from '../utils/constants.js';
import { getToken, isTokenExpired, parseToken, removeToken } from '../utils/tokenUtils.js';
import { store } from '../redux/store.js';
import { logout } from '../redux/slices/authSlice.js';

let mockProducts = [...PRODUCTS];
const mockUsers = [
  { id: 'u1', name: 'Demo User', email: 'demo@starlfinx.com', password: 'demopass' }
];

const createJWT = (user) => {
  const payload = {
    user: { id: user.id, name: user.name, email: user.email },
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  };
  return `starlfinx.${btoa(JSON.stringify(payload))}.token`;
};

const buildResponse = (data, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
});

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  adapter: async (config) => {
    await delay(300);
    const url = config.url?.replace(API_BASE_URL, '') || '';
    const path = url.replace(/^\//, '');
    const method = config.method?.toLowerCase();
    const body = config.data ? JSON.parse(config.data) : null;
    const authHeader = config.headers?.Authorization || config.headers?.authorization;
    const token = authHeader?.replace('Bearer ', '');
    const authorized = token && !isTokenExpired(token);

    const matches = (pattern) => new RegExp(`^${pattern}$`).test(path);

    if (path.startsWith('products') || path.startsWith('auth') || path.startsWith('coupons')) {
      if (path.startsWith('products') && ['post', 'patch', 'delete'].includes(method) && !authorized) {
        return buildResponse({ message: 'Unauthorized' }, 401);
      }
    }

    try {
      if (method === 'get' && path === 'products') {
        return buildResponse({ products: [...mockProducts] });
      }

      if (method === 'get' && matches('products/[^/]+')) {
        const id = path.split('/')[1];
        const product = mockProducts.find((item) => item.id === id);
        if (!product) throw new Error('Product not found');
        return buildResponse({ product });
      }

      if (method === 'post' && path === 'products') {
        const newProduct = { ...body, id: `p${Date.now()}`, stock: Number(body.stock || 1) };
        mockProducts = [newProduct, ...mockProducts];
        return buildResponse({ product: newProduct }, 201);
      }

      if (method === 'patch' && matches('products/[^/]+')) {
        const id = path.split('/')[1];
        const index = mockProducts.findIndex((item) => item.id === id);
        if (index === -1) throw new Error('Product not found');
        mockProducts[index] = { ...mockProducts[index], ...body };
        return buildResponse({ product: mockProducts[index] });
      }

      if (method === 'delete' && matches('products/[^/]+')) {
        const id = path.split('/')[1];
        mockProducts = mockProducts.filter((item) => item.id !== id);
        return buildResponse({ success: true });
      }

      if (method === 'post' && path === 'auth/login') {
        const user = mockUsers.find((account) => account.email === body.email && account.password === body.password);
        if (!user) throw new Error('Invalid email or password');
        return buildResponse({ user: { id: user.id, name: user.name, email: user.email }, token: createJWT(user) });
      }

      if (method === 'post' && path === 'auth/signup') {
        const existingUser = mockUsers.some((account) => account.email === body.email);
        if (existingUser) throw new Error('Email already registered');
        const newUser = { id: `u${Date.now()}`, name: body.name, email: body.email, password: body.password };
        mockUsers.push(newUser);
        return buildResponse({ user: { id: newUser.id, name: newUser.name, email: newUser.email }, token: createJWT(newUser) });
      }

      if (method === 'post' && path === 'coupons/validate') {
        const coupon = COUPON_CODES.find((item) => item.code === body.code.toUpperCase());
        if (!coupon) throw new Error('Coupon code not found');
        return buildResponse({ coupon });
      }

      return buildResponse({ message: 'Not implemented' }, 404);
    } catch (error) {
      const status = error.message === 'Invalid email or password' || error.message === 'Email already registered' || error.message === 'Coupon code not found' || error.message === 'Product not found' ? 400 : 500;
      return Promise.reject({ response: { data: { message: error.message }, status } });
    }
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
