import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;

  // Add more properties as needed
}

const initialState: UserState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Add more reducer functions as needed
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
