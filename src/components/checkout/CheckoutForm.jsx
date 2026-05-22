// /src/components/checkout/CheckoutForm.jsx
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  address: yup.string().required('Address is required').min(15, 'Please provide a full address')
});

const CheckoutForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: '', phone: '', address: '' },
    mode: 'onChange'
  });

  useEffect(() => {
    reset({ fullName: '', phone: '', address: '' });
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl bg-white p-6 shadow-card">
      <div className="space-y-4">
        <Input label="Full Name" name="fullName" register={register('fullName')} error={errors.fullName} />
        <Input label="Phone" name="phone" register={register('phone')} error={errors.phone} />
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-slate-700">Delivery Address</label>
          <textarea id="address" rows="5" {...register('address')} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
        </div>
      </div>
      <Button type="submit" disabled={!isValid || loading}>
        {loading ? 'Processing...' : 'Confirm Order'}
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

CheckoutForm.defaultProps = {
  loading: false
};

export default CheckoutForm;
