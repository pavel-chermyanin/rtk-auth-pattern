
import { api } from "../api";

export const consultationDoctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorConsultations: builder.query<any, any>({
      query: () => ({
        url: "/consultations/doctor/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDoctorConsultationsQuery } =
  consultationDoctorApi;

export const {
  endpoints: {  },
} = consultationDoctorApi;
