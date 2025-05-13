import { baseApi } from "../../../api/baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sellerAnnouncment: build.query({
      query: (sellerId) => ({
        url: `seller-announcement/${sellerId}`,
      }),
      providesTags: ["announcement"],
    }),
  }),
});

export const { useSellerAnnouncmentQuery } = announcementApi;
