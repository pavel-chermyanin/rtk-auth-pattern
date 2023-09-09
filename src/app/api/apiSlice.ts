import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

interface ExtraOptions {
  body?: string; // Типизируйте тело запроса как строку (предполагая, что refreshToken - строка)
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dj-front.doct24.com/api/v1/",
  prepareHeaders: async (headers) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refreshToken");

  if (result?.error?.status == 401 && refreshToken) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery(
      "/authentification/token/refresh/",
      api,
      { ...extraOptions, body: refreshToken }
    );
    console.log("refreshResult");
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      // повторим оригинальный запрос с новым токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
