import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, User } from "../../types/auth";
import axios from "axios";
import { toast, ToastOptions } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { TOAST_OPTION } from "../../constants/setting";




let user = null;
if (sessionStorage.getItem("user") !== "undefined") {
  user = JSON.parse(sessionStorage.getItem("user") || "null") as User | null;
}

const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

export interface AuthState {
  user: User | null;
  formData: FormData;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
}

const initialState: AuthState = {
  user: user ? user : null,
  formData: {
    name: "",
    password: "",
    gender: ""
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const initAuthInfo = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
  delete axios.defaults.headers.common["Authorization"];
};

// createAsyncThunk를 사용하여 백엔드에 회원가입 요청을 보내는 비동기 액션을 생성.
export const register = createAsyncThunk(
  "auth/register",
  async (args: { formData: FormData, navi: NavigateFunction }, thunkAPI) => {

    try {
      const response = await axios.post("/api/auth/register", args.formData);

      toast.success(response.data.message, TOAST_OPTION);
      args.navi("/login");
      return response.data;
    } catch (error: any) {

      toast.error(error.response.data.message, TOAST_OPTION);

    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (form: any, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", form);
      toast.success(response.data.message, TOAST_OPTION);
      if (response.data) {
        // user { name: "user", ... }
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }

      response.headers["x-auth-token"] &&
        sessionStorage.setItem("token", response.headers["x-auth-token"]);
      response.headers["x-refresh-token"] &&
        sessionStorage.setItem(
          "refreshToken",
          response.headers["x-refresh-token"]
        );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.headers["x-auth-token"]}`;

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 반환한 경우

      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (navi: NavigateFunction, thunkAPI) => {
    initAuthInfo();
    init();
    navi("/");

    toast.success("Logout success", TOAST_OPTION);
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (navi: NavigateFunction) => {
    try {
      const response = await axios.post("/api/auth/delete");
      navi("/");
      toast.success(response.data.message);
      initAuthInfo();
      init();

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        toast.error(error.response.data.message);
      }
    }
  }
);

// createSlice에서 이 비동기 액션을 처리
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    init: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isSuccess = true;
        // state.isSuccess = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.formData = action.payload.formData;
        state.isSuccess = true;

      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;

        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = null;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;

      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

      })
      .addCase(init, (state) => {
        state = initialState;
      });
  },
});

export const { init } = authSlice.actions;
export default authSlice.reducer;
