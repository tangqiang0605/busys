import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../apis/user/userInfo";

type UserStore = { userInfo: User, expr: number }

const initialState: Partial<UserStore> = {}

export const UserInfoKey = 'userInfo'

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{ user: User, expr: number }>) => {
      state.userInfo = action.payload.user;
      state.expr = action.payload.expr
    },
    clearUser: (state) => {
      state.userInfo = {} as any;
      state.expr = 0
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
