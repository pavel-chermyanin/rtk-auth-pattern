import { apiSlice } from "../../store/api/apiSlice";
import { DoctorAdvancedTraining } from "../../types/doctor/helperTypes/DoctorAdvancedTraining";

export const advancedTrainingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvancedTraining: builder.query<DoctorAdvancedTraining[], void>({
      query: () => ({
        url: "/doctors/advanced_training/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdvancedTrainingQuery } = advancedTrainingApi;

export const {
  endpoints: {},
} = advancedTrainingApi;
