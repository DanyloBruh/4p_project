/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [1,2,2,3,3,4,5,6,7,8,54,3,234,2345,2],
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    addOrderData: (state, action) => {
      state.data.push(action.payload);
    },
    deleteOrderData: (state) => {
      state.data = initialState.data;
    }
  },
});

export const { addOrderData, deleteOrderData } = orderDataSlice.actions;

export default orderDataSlice.reducer;
