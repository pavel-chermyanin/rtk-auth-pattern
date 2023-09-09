
import { apiSlice } from "../../app/api/apiSlice";

export const consultationDoctorApi = apiSlice.injectEndpoints({
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


