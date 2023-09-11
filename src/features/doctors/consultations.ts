
import { apiSlice } from "../../app/api/apiSlice";

export const consultationDoctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorConsultations: builder.query<any, void>({
      query: () => ({
        url: "/consultations/doctor/",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // Здесь вы можете выполнять обработку данных из ответа API
        // Верните то, что вам нужно сохранить в поле data(const {data} = useGetDoctorConsultationsQuery())
        return response?.data?.consultations; // Например, если данные находятся в поле "data" в ответе
      },
    }),
  }),
});

export const { useGetDoctorConsultationsQuery } =
  consultationDoctorApi;

export const {
  endpoints: { getDoctorConsultations },
} = consultationDoctorApi;


