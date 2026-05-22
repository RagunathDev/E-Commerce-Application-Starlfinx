// /src/redux/slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as loginService, signup as signupService } from '../../services/authService.js';
import { getToken, setToken, removeToken, parseToken, isTokenExpired } from '../../utils/tokenUtils.js';

const loadUserFromStorageData = () => {
  const token = getToken();
  if (!token || isTokenExpired(token)) return { user: null, token: null, isAuthenticated: false };
  const payload = parseToken(token);
  return { user: payload?.user || null, token, isAuthenticated: Boolean(payload?.user) };
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginService(credentials);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const signup = createAsyncThunk('auth/signup', async (registration, { rejectWithValue }) => {
  try {
    return await signupService(registration);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Signup failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUserFromStorage(state) {
      const stored = loadUserFromStorageData();
      state.user = stored.user;
      state.token = stored.token;
      state.isAuthenticated = stored.isAuthenticated;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      removeToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        setToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        setToken(action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loadUserFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
