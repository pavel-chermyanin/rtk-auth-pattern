// import { User } from '@prisma/client';
import { api } from './api';

// export type UserData = Omit<User, 'id'>;
// type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Получить код подтверждения номера телефона через flash call (без авторизации)
    authPhoneNumber: builder.mutation<any, any>({
      query: (phone) => ({
        url: "/authentification/auth_phone_number/",
        method: "POST",
        body: phone,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/authentification/login/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useAuthPhoneNumberMutation,useLoginMutation} = authApi;

export const {
  endpoints: { authPhoneNumber,login },
} = authApi;
