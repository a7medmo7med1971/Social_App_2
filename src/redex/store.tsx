// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authiniCation } from './authSlice';
import { signupReducer } from './authSkiceSignup';
import { allPostesReducer } from './getAllPostes';
import { SinglePostsReducer } from './getSinglePost';



export const store = configureStore({
  reducer: {
    authiniCation,
    signupReducer,
    allPostesReducer,
    SinglePostsReducer,
  },
});
export type dispatchType = typeof store.dispatch
export type Statetype = ReturnType< typeof store.getState> 