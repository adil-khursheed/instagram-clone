import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: () => ({
        url: `${conf.socialMediaBaseUrl}/posts/get/my`,
      }),
    }),
  }),
});

export const { useGetMyPostsQuery } = postsApiSlice;
