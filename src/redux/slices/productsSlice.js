// /src/redux/slices/productsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchProductById, fetchProducts, updateProduct } from '../../services/productService.js';

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  adminMode: false
};

export const loadProducts = createAsyncThunk('products/loadProducts', async (_, { rejectWithValue }) => {
  try {
    return await fetchProducts();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load products');
  }
});

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id, { rejectWithValue }) => {
  try {
    return await fetchProductById(id);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load product details');
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData, { rejectWithValue }) => {
  try {
    return await createProduct(productData);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to create product');
  }
});

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, updates }, { rejectWithValue }) => {
  try {
    return await updateProduct(id, updates);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to update product');
  }
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (id, { rejectWithValue }) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to delete product');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleAdminMode(state) {
      state.adminMode = !state.adminMode;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { toggleAdminMode } = productsSlice.actions;
export default productsSlice.reducer;
