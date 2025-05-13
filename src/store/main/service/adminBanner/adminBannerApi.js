import { baseApi } from "../../../api/baseApi";

const adminBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    defaultAdminBanner: build.query({
      query: () => ({
        url: `admin-default-banner`,
      }),
      providesTags: ["admin-default-banner"],
    }),
  }),
});

export const { useDefaultAdminBannerQuery } = adminBannerApi;
