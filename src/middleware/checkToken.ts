import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../features/auth/authSlice";
import { store } from "../app/store";
import { refreshAccessToken } from "./refreshToken";

const checkToken: Middleware = () => (next) => async (action) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (action.meta && action.meta.requiresToken) {
    // Проверка токена
    if (!accessToken || !refreshToken) {
      store.dispatch(logout());
      return;
    }
    const accessTokenData = parseJwt(accessToken);
    if (accessTokenData.exp * 1000 < Date.now()) {
      try {
        // Вызов функции для обновления токена
        await refreshAccessToken(refreshToken);
      } catch (error) {
        store.dispatch(logout());
      }
    }
  }
  console.log(action);

  return next(action);
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};


export default checkToken;
