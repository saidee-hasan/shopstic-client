import { baseApi } from "../../../api/baseApi";

const sellerBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellerBanner: build.query({
      query: (sellerId) => ({
        url: `seller-banner/${sellerId}`,
      }),
    }),
  }),
});

export const { useGetSellerBannerQuery } = sellerBannerApi;
