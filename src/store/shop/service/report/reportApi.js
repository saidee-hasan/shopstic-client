import { baseApi } from "../../../api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query({
      query: (data) => ({
        url: `user-report?${data}`,
      }),
      providesTags: ["user-report"],
    }),
    createReport: build.mutation({
      query: (data) => ({
        url: "user-add-report",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user-report"],
    }),
    getReportedSeller: build.query({
      query: (data) => ({
        url: `reported-seller?${data}`,
      }),
    }),
  }),
});

export const {
  useGetReportQuery,
  useCreateReportMutation,
  useGetReportedSellerQuery,
} = reportApi;
