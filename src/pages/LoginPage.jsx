// /src/pages/LoginPage.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading, error, loadUserFromStorage } = useAuth();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const onSubmit = async (data) => {
    const result = await login(data);
    if (login.rejected && result.error) {
      return;
    }
  };

  return (
    <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <div className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="text-sm text-slate-500">Sign in to continue shopping and checkout securely.</p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" name="email" type="email" register={register('email')} error={errors.email} />
          <Input label="Password" name="password" type="password" register={register('password')} error={errors.password} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={!isValid || loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
