import { baseApi } from "../../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: (data) => ({
        url: `review?${data}`,
      }),
      providesTags: ["review"],
    }),
    getReviewByOrderId: build.query({
      query: (data) => ({
        url: `review-orderId?${data}`,
      }),
      providesTags: ["review"],
    }),
    createReview: build.mutation({
      query: (data) => ({
        url: "create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetReviewByOrderIdQuery,
} = reviewApi;
