import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  Fetch toàn bộ sản phẩm
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products');
  console.log(" Fetched products:", response.data);
  return response.data;
});

//  Thêm sản phẩm mới
export const addproduct = createAsyncThunk(
  'product/addproduct',
  async (newProduct) => {
  const response = await axios.post('http://localhost:3000/products', newProduct);
  console.log(" Added product:", response.data);
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
      })

      // ✅ Xử lý khi thêm sản phẩm thành công
      .addCase(addproduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productSlice.reducer;
