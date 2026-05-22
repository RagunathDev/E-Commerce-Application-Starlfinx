// /src/pages/SignupPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

const schema = yup.object({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, loading, error, loadUserFromStorage } = useAuth();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await signup(data);
  };

  return (
    <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <div className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
        <p className="text-sm text-slate-500">Join Starlfinx to save your cart and checkout quickly.</p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Full Name" name="name" register={register('name')} error={errors.name} />
          <Input label="Email" name="email" type="email" register={register('email')} error={errors.email} />
          <Input label="Password" name="password" type="password" register={register('password')} error={errors.password} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={!isValid || loading}>{loading ? 'Creating account...' : 'Sign up'}</Button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
