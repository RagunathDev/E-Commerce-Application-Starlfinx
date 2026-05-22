// /src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ProductListPage from '../pages/ProductListPage.jsx';
import ProductDetailPage from '../pages/ProductDetailPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductListPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
    <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default AppRouter;
