// /src/components/product/ProductForm.jsx
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be greater than zero').required('Price is required'),
  stock: yup.number().typeError('Stock must be a number').integer().min(1, 'Stock must be at least 1').required('Stock is required'),
  imageUrl: yup.string().url('Enter a valid URL').required('Image URL is required'),
  description: yup.string().required('Description is required').min(20, 'Description should be at least 20 characters')
});

const ProductForm = ({ initialValues, onSubmit, loading }) => {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      stock: 1,
      imageUrl: '',
      description: '',
      ...initialValues
    },
    mode: 'onChange'
  });

  useEffect(() => {
    reset({ ...initialValues });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl bg-white p-6 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" register={register('name')} error={errors.name} />
        <Input label="Category" name="category" register={register('category')} error={errors.category} />
        <Input label="Price" name="price" type="number" register={register('price')} error={errors.price} />
        <Input label="Stock" name="stock" type="number" register={register('stock')} error={errors.stock} />
      </div>
      <Input label="Image URL" name="imageUrl" register={register('imageUrl')} error={errors.imageUrl} />
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
        <textarea id="description" rows="5" {...register('description')} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={!isValid || loading}>{loading ? 'Saving...' : 'Save Product'}</Button>
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

ProductForm.defaultProps = {
  initialValues: {},
  loading: false
};

export default ProductForm;
