/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 123120938448,
      name: 'order',
      phoneNumber: '30897879834',
      address: 'yyeyeyey',
      comment: 'pls',
      paymentType: 'cash',
      deliveryType: 'self',
      totalAmount: 40,
      status: 'online',
    },
  ],
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
    },
  },
});

export const { addOrderData, deleteOrderData } = orderDataSlice.actions;

export default orderDataSlice.reducer;
