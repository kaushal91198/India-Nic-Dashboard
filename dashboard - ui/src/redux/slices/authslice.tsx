import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/api";
import {
  loginAPIRequest,
  logoutAllAPIRequest,
  logoutAPIRequest,
  signupAPIRequest,
} from "../../types/apirequesttype/api.request";
import {
  getProfileAPIResponse,
  loginAPIResponse,
  logoutAlldeviceAPIResponse,
  logoutAPIResponse,
  signupAPIResponse,
} from "../../types/apiresponsetype/api.response";

export enum APIStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

export interface AuthState {
  accessToken: string | null;
  sessionId: string | null;
  loginStatus: APIStatus;
  logoutStatus: APIStatus;
  profileStatus: APIStatus;
  user: getProfileAPIResponse;
  logoutAllStatus: APIStatus;
  signupStatus: APIStatus;
}

const initialState: AuthState = {
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phoneNumber: "",
    role: "",
    gender: "",
    country: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  accessToken: null,
  sessionId: null,
  loginStatus: APIStatus.Idle,
  logoutAllStatus: APIStatus.Idle,
  profileStatus: APIStatus.Idle,
  logoutStatus: APIStatus.Idle,
  signupStatus: APIStatus.Idle,
};

// Async thunk for logging in
export const login = createAsyncThunk<
  loginAPIResponse,
  loginAPIRequest,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      withCredentials: true,
    });
    // Expected response.data: { accessToken, sessionId }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

// Async thunk for logging in
export const signup = createAsyncThunk<
  signupAPIResponse,
  signupAPIRequest,
  { rejectValue: string }
>("auth/signup", async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/register", credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Signup failed"
    );
  }
});

// Async thunk for Profile
export const profileAPI = createAsyncThunk<{
  user: getProfileAPIResponse;
}>("auth/profileAPI", async (_credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/users/profile", {
      withCredentials: true,
    });
    // Expected response.data: { accessToken, sessionId }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "API failed"
    );
  }
});

// Async thunk for logging out
export const logout = createAsyncThunk<
  logoutAPIResponse,
  logoutAPIRequest,
  { rejectValue: string }
>("auth/logout", async ({ sessionId }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(
      "/auth/logout",
      { sessionId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});
export const logoutAll = createAsyncThunk<
  logoutAlldeviceAPIResponse,
  logoutAllAPIRequest,
  { rejectValue: string }
>("auth/logoutall", async ({}, thunkAPI) => {
  try {
    const response = await axiosInstance.post(
      "/auth/logout-all",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.accessToken = null;
      state.sessionId = null;
      state.loginStatus = APIStatus.Idle;
      state.profileStatus = APIStatus.Idle;
      state.logoutStatus = APIStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(login.pending, (state) => {
      state.loginStatus = APIStatus.Pending;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = APIStatus.Fulfilled;
      state.accessToken = action.payload.accessToken;
      state.sessionId = action.payload.sessionId;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginStatus = APIStatus.Rejected;
    });
    // Logout cases
    builder.addCase(logout.pending, (state) => {
      state.logoutStatus = APIStatus.Pending;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutStatus = APIStatus.Fulfilled;
      state.accessToken = null;
      state.sessionId = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutStatus = APIStatus.Rejected;
    });
    builder.addCase(profileAPI.pending, (state) => {
      state.profileStatus = APIStatus.Pending;
    });
    builder.addCase(profileAPI.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(profileAPI.rejected, (state) => {
      state.profileStatus = APIStatus.Rejected;
    });
    builder.addCase(logoutAll.pending, (state) => {
      state.logoutAllStatus = APIStatus.Rejected;
    });
    builder.addCase(logoutAll.fulfilled, (state) => {
      state.logoutAllStatus = APIStatus.Rejected;
    });
    builder.addCase(logoutAll.rejected, (state) => {
      state.logoutAllStatus = APIStatus.Rejected;
    });
    builder.addCase(signup.pending, (state) => {
      state.signupStatus = APIStatus.Rejected;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.signupStatus = APIStatus.Rejected;
    });
    builder.addCase(signup.rejected, (state) => {
      state.signupStatus = APIStatus.Rejected;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
