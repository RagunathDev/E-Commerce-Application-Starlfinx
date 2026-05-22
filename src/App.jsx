// /src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { useAuth } from './hooks/useAuth.js';
import Navbar from './components/layout/Navbar.jsx';
import AppRouter from './routes/AppRouter.jsx';
import './index.css';

const AppContent = () => {
  const { loadUserFromStorage } = useAuth();

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <AppRouter />
      </div>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-600">
        <p>© 2025 Starlfinx. All rights reserved. | Production-grade React e-commerce platform.</p>
      </footer>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </BrowserRouter>
);

export default App;
