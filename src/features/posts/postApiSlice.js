import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: (queryParams) => ({
        url: `${conf.socialMediaBaseUrl}/posts/get/my?${queryParams}`,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          };
        }
        return newItems;
      },
    }),
  }),
});

export const { useGetMyPostsQuery } = postsApiSlice;
