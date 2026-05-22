// /src/utils/tokenUtils.js
export const getToken = () => localStorage.getItem('ecom_token');

export const setToken = (token) => {
  localStorage.setItem('ecom_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('ecom_token');
};

export const parseToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = parseToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
};
