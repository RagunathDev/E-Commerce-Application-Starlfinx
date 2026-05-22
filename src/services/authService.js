// /src/services/authService.js
import axiosInstance from './axiosInstance.js';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (registration) => {
  const response = await axiosInstance.post('/auth/signup', registration);
  return response.data;
};
