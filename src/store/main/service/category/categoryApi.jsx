import { baseApi } from "../../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "categories",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
