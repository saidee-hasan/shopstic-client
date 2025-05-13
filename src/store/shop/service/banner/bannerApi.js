import { baseApi } from "../../../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    defaultBanner: build.query({
      query: (sellerId) => ({
        url: `seller-default-banner/${sellerId}`,
      }),
      providesTags: ["seller-default-banner"],
    }),
  }),
});

export const { useDefaultBannerQuery } = bannerApi;
