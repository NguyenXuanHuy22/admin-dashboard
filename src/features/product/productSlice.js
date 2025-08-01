import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products');
    console.log("✅ Fetched products:", response.data); // Thêm dòng này
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;