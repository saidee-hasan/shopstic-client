import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imgbbApi = createApi({
  reducerPath: "imgbbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imageBB_api
    }`,
  }),
  endpoints: () => ({}),
  tagTypes: [],
});

const imgbbApiService = imgbbApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imgbbApiService;