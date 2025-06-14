import { baseApi } from "../../../api/baseApi";

const adminMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminMessage: build.query({
      query: (email) => ({
        url: `admin-message/${email}`,
      }),
    }),
  }),
});

export const { useGetAdminMessageQuery } = adminMessageApi;
