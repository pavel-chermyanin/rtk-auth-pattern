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
      localStorage.setItem("accessToken", action.payload.access);
    }
    if (action.payload.refresh) {
      localStorage.setItem("refreshToken", action.payload.refresh);
    }
  },
});
