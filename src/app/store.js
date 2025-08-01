import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from '../features';
import productDetailReducer from '../features/product/productDetailSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
productDetail: productDetailReducer, 
 },
});