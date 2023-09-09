import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";
import jwtDecode from "jwt-decode";
import { logout } from "../features/auth/authSlice";

export const refreshMiddleware = createListenerMiddleware();

refreshMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // Ваш предикат, который определяет, должен ли middleware выполняться
    // Например, можно использовать типы action для проверки,
    // вернул ли запрос ошибку.
    return true;
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.error) {
      // Здесь можно обрабатывать ошибку запроса
      console.error("Запрос вернул ошибку:", action.error);

      // Если запрос вернул ошибку и это не refresh запрос,
      // то попробуйте выполнить refresh
      if (action.endpointName !== "refresh") {
        try {
          // Выполните запрос на обновление токена с использованием refreshToken
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const refreshAction = authApi.endpoints.refresh.initiate({
              refresh: refreshToken,
            });

            const response = await listenerApi.dispatch(refreshAction);

            // Обработайте успешный ответ и обновите токены
            if ("data" in response) {
              // Обработайте успешный ответ и обновите токены
              const { access, refresh } = response.data;
              localStorage.setItem("accessToken", access);
              localStorage.setItem("refreshToken", refresh);
            }
          }
        } catch (refreshError) {
          listenerApi.dispatch(logout());
          // Если обновление токена завершилось неудачно, выполните логаут
          // Выполните логаут или другие необходимые действия
        }
      } else {
        listenerApi.dispatch(logout());
      }
    }
  },
});
// В этом коде мы проверяем, вернул ли запрос ошибку, и если это так, мы попытаемся выполнить запрос на обновление токена (refresh). При успешном обновлении токенов мы обновляем их в localStorage.
