import { baseApi } from "../../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQnA: build.query({
      query: (data) => ({
        url: `user-product-questions?${data}`,
      }),
      providesTags:["product-questions"]
    }),
  }),
});

export const { useGetQnAQuery } = questionApi;
