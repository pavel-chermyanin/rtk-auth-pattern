import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { logout } from "../../features/auth/authSlice";
import { store } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dj-front.doct24.com/api/v1/",
  prepareHeaders: async (headers) => {
    const accessToken = localStorage.getItem("accessToken");  

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
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
