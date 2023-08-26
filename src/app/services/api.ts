import { RootState } from './../store';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

// Глобальные обработчики для всех запросов
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dj-front.doct24.com/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken ||
      localStorage.getItem("accessToken");

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});

// если запрос вернет ошибку сделать еще один на случай если ошибка одномоментная
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'doctApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
