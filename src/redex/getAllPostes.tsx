// postsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ----------  واجهات البيانات ---------- */

// بيانات المستخدم (سواء في البوست أو الكومنت)
export interface IUser {
  _id: string;
  name: string;
  photo: string;
}

// بيانات الكومنت
export interface IComment {
  _id: string;
  content: string;
  commentCreator: IUser;
  post: string;
  createdAt: string;
}

// بيانات البوست
export interface IPost {
  _id: string;
  body: string;
  user: IUser;
  createdAt: string;
  comments: IComment[];
}

// الـ API بيرجع object فيه posts array
export interface IPostsResponse {
  posts: IPost[];
}

/* ----------  الـ Thunk ---------- */

export const getAllPostes = createAsyncThunk<IPostsResponse, string | undefined>(
  "getAllPostes/getAllPostes",
  async (limit) => {
    const res = await axios.get(`https://linked-posts.routemisr.com/posts?${limit?limit:50}`);
    return res.data; // هنرجع البيانات للـ extraReducers
  }
);

/* ---------- 3 الـ State ---------- */

interface AllPostesState {
  loading: boolean;
  posts: IPost[];
}

const initialState: AllPostesState = {
  loading: false,
  posts: [],
};

/* ---------- 4 الـ Slice ---------- */

export const AllPostes = createSlice({
  name: "AllPostes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostes.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts; // نخزن البوستات
      })
      .addCase(getAllPostes.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* ---------- 5التصدير ---------- */

export const allPostesReducer = AllPostes.reducer;
