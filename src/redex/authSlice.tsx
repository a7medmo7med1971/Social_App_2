import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


//  الـ thunk المسؤول عن تسجيل الدخول
export const handelLogin = createAsyncThunk(
  "auth/login", // اسم الـ action
  async (
    value: { email: string; password: string }, // البيانات اللي بنبعتها (الإيميل + الباسورد)
    { rejectWithValue } // عشان نقدر نرجع error مظبوط
  ) => {
    try {
      // إرسال طلب تسجيل الدخول للـ API
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        value
      );

      return response.data; //  لو نجح: نرجع الداتا (token + user)
    } catch (error: any) {
      //  لو فشل: نرجع رسالة الخطأ
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ في تسجيل الدخول"
      );
    }
  }
);

// 1️⃣ تعريف شكل (Type) الـ state بتاع الauth
interface AuthState {
  token: string | null;                 // التوكن (JWT) اللي جاي من السيرفر
  userData: Record<string, any> | null; // بيانات المستخدم اللي راجعة من السيرفر
  loading: boolean;                     // هل في عملية تسجيل دخول شغالة ولا لأ
  error: string | null;                 // أي رسالة خطأ تحصل
}

// 2️⃣ الـ initial state (الحالة المبدئية)
const initialState: AuthState = {
  token: null,
  userData: null,
  loading: false,
  error: null,
};

// 4️⃣ الـ Slice: مسؤول عن التحكم في حالة الـ state بناءً على الـ actions
const authinication = createSlice({
  name: "auth", // اسم الـ slice
  initialState, // الحالة المبدئية
  reducers: {
    // Reducer لإعادة ضبط كل الداتا (زي تسجيل خروج)
   clearData: (state) => {
   Object.assign(state, initialState);
   Cookies.remove("token");
   
   }
  },
  extraReducers: (builder) => {
    builder
      // 🟡 حالة pending → لما يبدأ تسجيل الدخول
      .addCase(handelLogin.pending, (state) => {
        state.loading = true;  // نشغل التحميل (loading...)
        state.error = null;    // نمسح أي error قديم
      })

      // 🟢 حالة fulfilled → لما تسجيل الدخول ينجح
      .addCase(handelLogin.fulfilled, (state, action) => {
        state.loading = false;           // نوقف التحميل
        state.error = null;              // مفيش خطأ
        state.token = action.payload?.token;  // نخزن التوكن اللي جاي من السيرفر
        Cookies.set('token', action.payload?.token)
        //console.log(Cookies.get('token'))
        state.userData = action.payload?.user || null; // نخزن بيانات المستخدم
      })

      // 🔴 حالة rejected → لما تسجيل الدخول يفشل
      .addCase(handelLogin.rejected, (state, action) => {
        state.loading = false;             // نوقف التحميل
        state.error = action.payload as string; // نخزن رسالة الخطأ
        console.log( state.error)
      });
  },
});

// 5️⃣ نطلع الأكشن (clearData) والـ reducer عشان نستخدمهم برا
export const { clearData } = authinication.actions;
export const authiniCation = authinication.reducer;

