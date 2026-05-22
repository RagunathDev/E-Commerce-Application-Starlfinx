// /src/components/common/Badge.jsx
import PropTypes from 'prop-types';

const Badge = ({ children, color = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    slate: 'bg-slate-100 text-slate-700'
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colorStyles[color] || colorStyles.blue}`}>{children}</span>;
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'slate'])
};

export default Badge;
