import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";



const initialState = {
  // user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state,action) => {
      localStorage.setItem("accessToken",action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
      state.isAuthenticated = true

    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isAuthenticated = false;
    },
  },
});
export const { setCredentials,logout } = authSlice.actions;

export default authSlice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
