import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import ApiUrls from "@/config/apiUrls";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  emailForOtp: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  emailForOtp: localStorage.getItem("emailForOtp"),
  loading: false,
  error: null,
  message: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(ApiUrls.AUTH.SIGNUP, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ApiUrls.AUTH.VERIFY_OTP, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "OTP failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    data: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
     const res = await api.post(ApiUrls.AUTH.LOGIN, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
       const res = await api.post(ApiUrls.AUTH.FORGOT_PASSWORD, data);
      return { ...res.data, email: data.email };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Forgot password failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { email: string; otp: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
       const res = await api.post(ApiUrls.AUTH.RESET_PASSWORD, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ApiUrls.AUTH.RESEND_OTP, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.emailForOtp = action.payload.email;
        localStorage.setItem("emailForOtp", action.payload.email);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.removeItem("emailForOtp");
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.emailForOtp = action.payload.email;
        localStorage.setItem("emailForOtp", action.payload.email);
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;