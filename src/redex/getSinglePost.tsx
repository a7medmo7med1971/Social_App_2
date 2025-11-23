// src/redex/getSinglePost.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// IMPORT IPost
import { IPost } from "@/typs/IPost";

/* ----------  الـ Thunk ---------- */
const token = Cookies.get("token");

export const getSinglePost = createAsyncThunk<{ post: IPost }, string>(
  "getSinglePost/getSinglePost",
  async (id: string) => {
    const res = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );

    return res.data; // {post: {...}}
  }
);

/* ----------  الـ State ---------- */
interface SinglePostState {
  loading: boolean;
  post: IPost | null;
}

const initialState: SinglePostState = {
  loading: false,
  post: null,
};

/* --------الـ Slice ---------- */
export const SinglePost = createSlice({
  name: "SinglePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* ----------  Export ---------- */
export const SinglePostsReducer = SinglePost.reducer;
