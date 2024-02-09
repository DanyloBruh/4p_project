/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    offScroll: () => {
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'hidden';
    },
    onScroll: () => {
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'visible';
    },
  },
});

export const { offScroll, onScroll } = scrollSlice.actions;

export default scrollSlice.reducer;
