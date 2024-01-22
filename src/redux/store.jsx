import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

/* eslint-disable import/prefer-default-export */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
