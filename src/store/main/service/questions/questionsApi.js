import { baseApi } from "../../../api/baseApi";

const questionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductQuestions: build.query({
      query: (data) => ({
        url: `product-questions?${data}`,
      }),
      providesTags: ["product-questions"],
    }),
    createProductQuestion: build.mutation({
      query: (data) => ({
        url: `product-question-create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-questions"],
    }),
    updateProductQuestion: build.mutation({
      query: (data) => ({
        url: `product-qestion-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-questions"],
    }),
  }),
});

export const {
  useGetProductQuestionsQuery,
  useCreateProductQuestionMutation,
  useUpdateProductQuestionMutation,
} = questionsApi;
