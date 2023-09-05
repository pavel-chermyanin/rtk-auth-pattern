import { RootState } from "./../../app/store";
// import { User } from '@prisma/client';
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";

// interface InitialState {
//   user: (User & { token: string }) | null;
//   isAuthenticated: boolean;
// }

const initialState: any = {
  // user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      console.log('logout')
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
      }
    );
  },
});
export const { logout } = slice.actions;

export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
