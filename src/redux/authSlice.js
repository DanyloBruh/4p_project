/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.auth = action.payload;
    },
    logoutReducer: (state) => {
      state.auth = initialState.auth;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
