import { baseApi } from "../../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    feedback: build.mutation({
      query: (data) => ({
        url: "feedback",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useFeedbackMutation } = feedbackApi;
