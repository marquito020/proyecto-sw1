import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user.models";

const EmptyUserState: UserInfo = {
  _id: "",
  name: "",
  email: "",
};

const persistLocalStorageUser = (user: UserInfo) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearLocalStorageUser = () => {
  localStorage.removeItem("user");
};

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user") as string) as UserInfo)
    : EmptyUserState,
  reducers: {
    createUser: (state, action: PayloadAction<UserInfo>) => {
      persistLocalStorageUser(action.payload);
      return action.payload;
    },
    resetUser: (state) => {
      clearLocalStorageUser();
      return EmptyUserState;
    },
  },
});

export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
