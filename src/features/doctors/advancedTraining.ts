import { apiSlice } from "../../app/api/apiSlice";

export const advancedTrainingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvancedTraining: builder.query<any, any>({
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
