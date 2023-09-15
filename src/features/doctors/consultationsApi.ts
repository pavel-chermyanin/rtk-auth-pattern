
import { apiSlice } from "../../store/api/apiSlice";
import { Consultation } from "../../types/consultation/Consultation";

export const consultationDoctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: "/consultations/doctor/",
        method: "GET",
      }),
      // keepUnusedDataFor: 5, // консультации будем хранить в кеше 5 сек
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


