/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';
const myStorage = window.localStorage;
const initialState = {
  data: JSON.parse(myStorage.getItem('order')) || [],
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    addOrderData: (state, action) => {
      const addDate = action.payload;
      let data = state.data;
      const findProd = data.find(
        (product) => product.product.id === addDate.product.id,
      );
      if (findProd) {
        data = data.map((pr) => {
          if (pr.product.id === findProd.product.id) {
            const coun = pr.count + addDate.count;
            return {
              product: pr.product,
              count: coun,
            };
          }
          return pr;
        });
      } else {
        data.push(addDate);
      }
      myStorage.setItem('order', JSON.stringify(data));
      state.data = data;
    },
    addCountData: (state, action) => {
      const id = action.payload;
      let data = state.data;
      data = data.map((pr) => {
        if (pr.product.id === id) {
          return {
            product: pr.product,
            count: pr.count + 1,
          };
        }
        return pr;
      });

      myStorage.setItem('order', JSON.stringify(data));
      state.data = data;
    },
    decCountData: (state, action) => {
      const id = action.payload;
      let data = state.data;
      data = data.map((pr) => {
        if (pr.product.id === id) {
          if (pr.count - 1 === 0) {
            console.log('error 1 is min value');
            return pr;
          }
          return {
            product: pr.product,
            count: pr.count - 1,
          };
        }
        return pr;
      });

      myStorage.setItem('order', JSON.stringify(data));
      state.data = data;
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      let data = state.data;
      data = data.filter((pr) => pr.product.id !== id);

      myStorage.setItem('order', JSON.stringify(data));
      state.data = data;
    },
    deleteOrderData: (state) => {
      state.data = [];
    },
  },
});

export const {
  addOrderData,
  deleteOrderData,
  decCountData,
  addCountData,
  deleteItem,
} = orderDataSlice.actions;

export default orderDataSlice.reducer;
