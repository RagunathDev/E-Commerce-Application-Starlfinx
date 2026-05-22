// /src/components/common/Input.jsx
import PropTypes from 'prop-types';

const Input = ({ label, name, type = 'text', register, error, placeholder, ...rest }) => (
  <div className="space-y-2">
    {label && <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      {...register}
      {...rest}
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
    {error && <p className="text-xs text-red-600">{error.message}</p>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.shape({ message: PropTypes.string }),
  placeholder: PropTypes.string
};

export default Input;
