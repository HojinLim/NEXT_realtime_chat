import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, User } from "../../types/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { NavigateFunction, Navigation } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user")!) as User | null;

const token = localStorage.getItem("token");

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
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// createAsyncThunk를 사용하여 백엔드에 회원가입 요청을 보내는 비동기 액션을 생성.
export const register = createAsyncThunk(
  "auth/register",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", formData);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 반환한 경우

        toast.error(error.response.data.error);
        // console.log(error.response.status); // 400
      } else if (error.request) {
        // 요청이 만들어졌지만, 응답이 없는 경우
        console.log(error.request);
      } else {
        // 요청을 만드는 중에 에러가 발생한 경우
        console.log("Error", error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", formData);

      if (response.data) {
        // user { name: "user", ... }
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      response.headers["x-auth-token"] &&
        localStorage.setItem("token", response.headers["x-auth-token"]);
      response.headers["x-refresh-token"] &&
        localStorage.setItem(
          "refreshToken",
          response.headers["x-refresh-token"]
        );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 반환한 경우

        toast.error(error.response.data.error);
        // console.log(error.response.status); // 400
      } else if (error.request) {
        // 요청이 만들어졌지만, 응답이 없는 경우
        console.log(error.request);
      } else {
        // 요청을 만드는 중에 에러가 발생한 경우
        console.log("Error", error.message);
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  delete axios.defaults.headers.common["Authorization"];
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (navi: NavigateFunction) => {
    try {
      const response = await axios.post("/api/auth/delete");
      navi("/");
      toast.success(response.data.message);

      init();

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        toast.error(error.response.data.error);
        // console.log(error.response.status); // 400
      } else if (error.request) {
        // 요청이 만들어졌지만, 응답이 없는 경우
        console.log(error.request);
      } else {
        // 요청을 만드는 중에 에러가 발생한 경우
        console.log("Error", error.message);
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
      .addCase(register.fulfilled, (state, action: PayloadAction<FormData>) => {
        // state.user = action.payload.;
        state.formData = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.user = action.payload.user;
        state.formData = action.payload.formData;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(init, (state) => {
        state = initialState;
      });
  },
});

export const { init } = authSlice.actions;
export default authSlice.reducer;
