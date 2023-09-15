import { Credentials } from './../../types/auth/Credentials';
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../../features/auth/authSlice";

interface ExtraOptions {
  body?: string; // Типизируйте тело запроса как строку (предполагая, что refreshToken - строка)
}


const baseQuery = fetchBaseQuery({
  baseUrl: "https://dj-front.doct24.com/api/v1/",
  prepareHeaders: async (headers) => {
    const accessToken = localStorage.getItem("accessToken");

    // если есть access токен - цепляем его в headers и возвращаем их
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});


// расширяем baseQuery который будет обновлять токен если есть возможность иначе logout
export const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  // делаем оригинальный запрос
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refreshToken");

  // если запрос вернул ошибку 401 и у нас есть refreshToken - сделаем запрос на обновление токена
  if (result?.error?.status == 401) {
    if(!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    interface RefreshResponse {
      data: Credentials
    }
    // кодга ставлю здесь тип RefreshResponse, ругается на error
    const refreshResult: any = await baseQuery(
      {
        method: "POST", 
        url: "/authentification/token/refresh/", 
        body: { refresh: refreshToken }, 
      },
      api,
      extraOptions
    );
    console.log("refreshResult");
    // если запрос /authentification/token/refresh/ вернул дату - записываем новую пару токенов
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      // повторим оригинальный запрос с новым refresh токеном
      result = await baseQuery(args, api, {
        ...extraOptions,
      });
    }
    // НУЖНО НАПИСАТЬ УНИВЕРСАЛЬНЫЙ ГАРД ДЛЯ ВСЕХ ОШИБОК
    if(refreshResult?.error?.status == 401) {
      api.dispatch(logout())
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,  
  endpoints: () => ({}),
  refetchOnMountOrArgChange:true
});
