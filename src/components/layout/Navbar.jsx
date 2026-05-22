// /src/components/layout/Navbar.jsx
import { useCallback, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import CartDrawer from '../cart/CartDrawer.jsx';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const activeClass = 'text-blue-600 font-semibold';
  const toggleDrawer = useCallback(() => setDrawerOpen((current) => !current), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          Starlfinx
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : 'text-slate-600 hover:text-slate-900'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? activeClass : 'text-slate-600 hover:text-slate-900'}>Products</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? activeClass : 'text-slate-600 hover:text-slate-900'}>Cart</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleDrawer} className="relative inline-flex items-center rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200">
            <span className="sr-only">View cart</span>
            🛒
            {count > 0 && <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] text-white">{count}</span>}
          </button>
          <CartDrawer isOpen={drawerOpen} items={items} onClose={closeDrawer} />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-slate-700">Hello, {user.name}</span>
              <button onClick={logout} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </div>
      {location.pathname === '/' && (
        <div className="bg-slate-50 px-4 py-2 text-sm text-slate-600 sm:px-6">
          Discover curated products, apply coupons, and checkout with confidence.
        </div>
      )}
    </header>
  );
};

export default Navbar;
