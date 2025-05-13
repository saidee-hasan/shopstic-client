import { baseApi } from "../../../api/baseApi";

const sellerProductApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMostViewSellerProduct: build.query({
      query: (data) => ({
        url: `seller-most-views-products?${data}`,
      }),
    }),
    getSellerLatestProducts: build.query({
      query: (data) => ({
        url: `seller-latest-product?${data}`,
      }),
    }),
  }),
});

export const { useGetMostViewSellerProductQuery,useGetSellerLatestProductsQuery } = sellerProductApi;
