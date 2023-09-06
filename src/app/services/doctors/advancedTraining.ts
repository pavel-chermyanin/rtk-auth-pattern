import { api } from "../api";

export const advancedTrainingApi = api.injectEndpoints({
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
