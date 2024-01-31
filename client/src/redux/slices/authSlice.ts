import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../../types/auth";
import axios from "axios";

interface AuthState {
  name: string;
  formData: FormData;
}

const initialState: AuthState = {
  name: "",
  formData: {
    name: "",
    password: "",
  },
};

// createAsyncThunk를 사용하여 백엔드에 회원가입 요청을 보내는 비동기 액션을 생성.
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", formData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<FormData>) => {
        state.name = action.payload.name;
        state.formData = action.payload;
      }
    );
    builder.addCase(signup.rejected, (state, action) => {
      // handle error
    });
  },
});

export const { init } = authSlice.actions;
export default authSlice.reducer;
