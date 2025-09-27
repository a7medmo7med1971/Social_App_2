import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handelSignup = createAsyncThunk(
  "signup/signup",
  async (
    value: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      dateOfBirth: string;
      gender: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        value
      );
      return response.data; // بيرجع { message: "success" }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "حدث خطأ أثناء التسجيل"
      );
    }
  }
);

interface SignupState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  successMessage: null,
};

 export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupState: (state) => {
      Object.assign(state, initialState); // reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handelSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(handelSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage = action.payload?.message || "تم التسجيل بنجاح";
        console.log(action.payload?.message)
      })
      .addCase(handelSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(state.error)
        state.successMessage = null;
      });
  },
});

export const { clearSignupState } = signupSlice.actions;
export const signupReducer = signupSlice.reducer;
