import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";
import jwtDecode from "jwt-decode";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher:
    authApi.endpoints.login.matchFulfilled ||
    authApi.endpoints.refresh.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.access) {
      const accessTime: { exp: number } = jwtDecode(action.payload.access);
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("accessTime", String(accessTime.exp));
    }
    if (action.payload.refresh) {
      const refreshTime: { exp: number } = jwtDecode(action.payload.refresh);
      localStorage.setItem("refreshToken", action.payload.refresh);
      localStorage.setItem("refreshTime", String(refreshTime.exp));
    }
  },
});
