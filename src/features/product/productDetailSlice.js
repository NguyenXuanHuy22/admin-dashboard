// src/redux/productDetailSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// load chi tiết sản phẩm
export const fetchProductById = createAsyncThunk(
  'productDetail/fetchProductById',
  async (id) => {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    return res.data;
  }
);

// cập nhật sản phẩm
export const updateProductById = createAsyncThunk(
  'productDetail/updateProductById',
  async ({ id, updatedProduct }) => {
    await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
    // sau khi cập nhật, fetch lại dữ liệu mới
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    return res.data;
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetail(state) {
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.product = action.payload; // cập nhật state với sản phẩm mới
      });
  }
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
