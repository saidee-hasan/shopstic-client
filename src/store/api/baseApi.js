import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeUser } from "../main/features/user/userSlice";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_api_url}`,
    credentials: "include",
  });
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error && [401, 403].includes(result?.error?.status)) {
    api.dispatch(removeUser());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "user",
    "user-address",
    "user-report",
    "views",
    "seller-default-banner",
    "seller-brands",
    "announcement",
    "product-questions",
    "order",
    "review",
  ],
  endpoints: () => ({}),
});
