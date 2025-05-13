import { baseApi } from "../../../api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAddress: build.query({
      query: (data) => ({
        url: `user-address?${data}`,
      }),
      providesTags: ["user-address"],
    }),
    createAddress: build.mutation({
      query: (data) => ({
        url: "user-address-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user-address"],
    }),
    updateAddress: build.mutation({
      query: (data) => ({
        url: `user-address-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user-address"],
    }),
    deleteAddress: build.mutation({
      query: (data) => ({
        url: `user-delete-address?${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-address"],
    }),
  }),
});

export const {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
