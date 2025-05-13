import { baseApi } from "../../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (data) => ({
        url: `order?${data}`,
      }),
      providesTags: ["order"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: build.mutation({
      query: (data) => ({
        url: `update-order`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
