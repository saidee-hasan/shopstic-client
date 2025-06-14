import { baseApi } from "../../../api/baseApi";

const allSellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSeller: build.query({
      query: ({ query }) => ({
        url: `all-seller?${query}`,
      }),
    }),
  }),
});

export const { useGetAllSellerQuery } = allSellerApi;
