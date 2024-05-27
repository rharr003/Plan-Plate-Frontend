import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface UserState {
  id: number | null;
  username: string | null;
  height: number;
  weight: number;
  date_of_birth: string;
  email: string;
}

const initialState: UserState = {
  id: null,
  username: null,
  height: 0,
  weight: 0,
  date_of_birth: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
