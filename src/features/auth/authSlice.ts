import { RootState } from "./../../store/store";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { UserShortModel } from "../../types/user/UserShortModel";

interface AuthState {
  user: UserShortModel | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  // ТАКАЯ ОБРАБОТКА НЕ ПРОХОДИТ ИЗ ТОГО 3 ФАЙЛА ИМЕЮТ ЦИКЛИЧНЫЕ ССЫЛКИ
  // ВМЕСТО ЭТО В КОМПОНЕНТЕ APP ДИСПАЧУ setUser

  // extraReducers: (builder) => {
  //   builder.addCase(
  //     authApi.endpoints.getMeUser.matchFulfilled,
  //     (state, action) => {
  //       // В этом обработчике мы устанавливаем пользователя в состояние
  //       state.user = action.payload;
  //     }
  //   );
  // },
});
export const { setCredentials, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
