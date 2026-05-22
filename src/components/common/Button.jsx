// /src/components/common/Button.jsx
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', disabled = false, variant = 'primary', className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string
};

export default Button;
