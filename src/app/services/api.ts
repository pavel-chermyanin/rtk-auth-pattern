import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { logout } from "../../features/auth/authSlice";
import { store } from "../store";
import { authApi } from "./auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dj-front.doct24.com/api/v1/",
  prepareHeaders: async (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    const accessTime = localStorage.getItem("accessTime");

    const refreshToken = localStorage.getItem("refreshToken");
    const refreshTime = localStorage.getItem("refreshTime");

    if (accessToken) {
      if (Number(accessTime) < Date.now() / 1000) {
        store.dispatch(logout());
        return; // Don't proceed with the request
      }

      headers.set("authorization", `Bearer ${accessToken}`);
    }

    if (refreshToken) {
      if (Number(refreshTime) < Date.now() / 1000) {
        try {
          // Здесь мы пытаемся инициировать мутацию refresh через authApi. Возвращается объект refreshResponse, который представляет результат выполнения этой мутации
          const refreshResponse =
            authApi.endpoints.refresh.initiate(refreshToken);

          // Здесь мы проверяем, успешно ли завершилась мутация refresh. Метод matchFulfilled возвращает true, если результат refreshResponse соответствует успешному состоянию (в этом случае, успешное обновление токена).
          if (authApi.endpoints.refresh.matchFulfilled(refreshResponse)) {
            const newAccessToken = refreshResponse.payload.data.access;
            headers.set("authorization", `Bearer ${newAccessToken}`);
          } else {
            console.error("Ошибка при обновлении токена");
          }
        } catch (error) {
          console.error("Ошибка при обновлении токена:", error);
        }
      }
    }
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "doctApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
