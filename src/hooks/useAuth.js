// /src/hooks/useAuth.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage as loadFromStorageAction, login as loginAction, logout as logoutAction, signup as signupAction } from '../redux/slices/authSlice.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const loadUserFromStorage = useCallback(() => {
    dispatch(loadFromStorageAction());
  }, [dispatch]);

  const login = useCallback((credentials) => {
    return dispatch(loginAction(credentials));
  }, [dispatch]);

  const signup = useCallback((registration) => {
    return dispatch(signupAction(registration));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    loadUserFromStorage,
    login,
    signup,
    logout
  };
};
