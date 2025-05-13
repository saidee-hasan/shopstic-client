import { baseApi } from "../../../api/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sellerBrands: build.query({
      query: (sellerId) => ({
        url: `seller-brands/${sellerId}`,
      }),
      providesTags: ["seller-brands"],
    }),
  }),
});

export const { useSellerBrandsQuery } = brandsApi;
