import { apiSlice } from "../../store/api/apiSlice";
import { Credentials } from "../../types/auth/Credentials";
import { LoginRequest } from "../../types/auth/LoginRequest";
import { PhoneNumber } from "../../types/auth/PhoneNumber";
import { UserShortModel } from "../../types/user/UserShortModel";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Получить код подтверждения номера телефона через flash call (без авторизации)
    authPhoneNumber: builder.mutation<PhoneNumber, PhoneNumber>({
      query: (phone) => ({
        url: "/authentification/auth_phone_number/",
        method: "POST",
        body: phone,
      }),
    }),
    login: builder.mutation<Credentials, LoginRequest>({
      query: (data) => ({
        url: `/authentification/login/`,
        method: "POST",
        body: data,
      }),
    }),
    getMeUser: builder.query<UserShortModel, void>({
      query: () => ({
        url: `/user/me/user`,
        method: "GET",
      }),
    }),
  }),
});


export const { useAuthPhoneNumberMutation, useLoginMutation, useGetMeUserQuery } = authApi;

export const {
  endpoints: { authPhoneNumber, login, getMeUser },
} = authApi;
