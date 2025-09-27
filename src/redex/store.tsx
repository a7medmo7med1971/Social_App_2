// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authiniCation } from './authSlice';
import { signupReducer } from './authSkiceSignup';



export const store = configureStore({
  reducer: {
    authiniCation,
    signupReducer,
  },
});
export type dispatchType = typeof store.dispatch
export type Statetype = ReturnType< typeof store.getState> 