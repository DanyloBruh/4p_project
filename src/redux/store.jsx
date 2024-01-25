import { configureStore } from '@reduxjs/toolkit';
import orderDataReducer from './orderDataSlice';

/* eslint-disable import/prefer-default-export */
export const store = configureStore({
  reducer: {
    orderData: orderDataReducer,
  },
});
