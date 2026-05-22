// /src/components/coupon/CouponInput.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button.jsx';

const CouponInput = ({ onApply, onRemove, coupon, loading, message }) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    onApply(code.trim());
    setCode('');
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter coupon code"
          className="min-w-0 flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <Button type="button" onClick={handleApply} disabled={loading || !code.trim()}>
          {loading ? 'Applying...' : 'Apply'}
        </Button>
      </div>
      {message && <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>{message.text}</p>}
      {coupon && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <span>Applied: {coupon.code}</span>
          <button type="button" onClick={onRemove} className="text-emerald-800 underline">
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

CouponInput.propTypes = {
  onApply: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  coupon: PropTypes.object,
  loading: PropTypes.bool,
  message: PropTypes.object
};

CouponInput.defaultProps = {
  coupon: null,
  loading: false,
  message: null
};

export default CouponInput;
