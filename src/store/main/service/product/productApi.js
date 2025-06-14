import { baseApi } from "../../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (sellerId) => ({
        url: `seller-products/${sellerId}`,
      }),
      providesTags: ["views"],
    }),
    getMostViewsProduct: build.query({
      query: (data) => ({
        url: `most-views-products?${data}`,
      }),
    }),
    getRatingProduct: build.query({
      query: (data) => ({
        url: `seller-rating-products?${data}`,
      }),
    }),
    searchProduct: build.query({
      query: (query) => ({
        url: `product-search?${query}`,
      }),
    }),
    getCategoryProducts: build.query({
      query: (query) => ({
        url: `category-products?${query}`,
      }),
    }),
    updateViews: build.mutation({
      query: (data) => ({
        url: "update-views",
        method: "PATCH",
        body: data,
      }),
    }),
    returnPolicy: build.query({
      query: (sellerId) => ({
        url: `seller-return-policy/${sellerId}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateViewsMutation,
  useGetMostViewsProductQuery,
  useReturnPolicyQuery,
  useGetRatingProductQuery,
  useSearchProductQuery,
  useGetCategoryProductsQuery,
} = productApi;
