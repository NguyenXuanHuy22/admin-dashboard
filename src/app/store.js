import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from '../features';
import productDetailReducer from '../features/product/productDetailSlice';
import orderReducer from '../features/product/orderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer, 
    order: orderReducer,
 },
});