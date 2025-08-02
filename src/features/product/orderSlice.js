import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔄 Thunk để lấy danh sách đơn hàng
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const res = await axios.get('http://localhost:3000/orders');
  return res.data;
});

// ✅ Thunk để cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, newStatus }, { dispatch }) => {
    await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus });
    dispatch(fetchOrders()); // Reload lại danh sách đơn hàng
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
