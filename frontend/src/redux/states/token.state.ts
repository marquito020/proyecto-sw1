import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const persistLocalStorageToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const clearLocalStorageToken = () => {
  localStorage.removeItem("token");
};

const EmptyTokenState = "";

const tokenSlice = createSlice({
  name: "token",
  initialState: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : EmptyTokenState,
  reducers: {
    createToken: (state, action: PayloadAction<string>) => {
      persistLocalStorageToken(action.payload);
      return action.payload;
    },
    resetToken: (state) => {
      clearLocalStorageToken();
      return EmptyTokenState;
    },
  },
});

export const { createToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
