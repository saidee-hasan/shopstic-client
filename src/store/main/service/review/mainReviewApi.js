import { baseApi } from "../../../api/baseApi";

const mainReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewByProductId: build.query({
      query: (data) => ({
        url: `review-productId?${data}`,
      }),
      providesTags: ["review"],
    }),
    getReviewBySellerId: build.query({
      query: ({ query }) => ({
        url: `seller-all-review?${query}`,
      }),
    }),
  }),
});

export const { useGetReviewByProductIdQuery, useGetReviewBySellerIdQuery } =
  mainReviewApi;
