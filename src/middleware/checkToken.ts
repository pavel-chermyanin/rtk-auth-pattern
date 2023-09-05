import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../features/auth/authSlice";
import { store } from "../app/store";
import { useRefreshMutation } from "../app/services/auth";

const checkToken: Middleware = () => (next) => async (action) => {
  const [refreshMutation] = useRefreshMutation();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    store.dispatch(logout());
    return;
  }

  if (action.meta && action.meta.requiresToken) {
    // Проверка токена
    const accessTokenData = parseJwt(accessToken);
    if (accessTokenData.exp * 1000 < Date.now()) {
      const refreshResponse = await refreshMutation({
        refreshToken,
      }).unwrap();
      if (refreshResponse.error) {
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
