import { configureStore } from '@reduxjs/toolkit';
import orderDataReducer from './orderDataSlice';
import authReducer from './authSlice';

/* eslint-disable import/prefer-default-export */
export const store = configureStore({
  reducer: {
    orderData: orderDataReducer,
    auth: authReducer,
  },
});
