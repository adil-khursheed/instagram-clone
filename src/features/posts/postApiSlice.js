import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: (page) => ({
        url: `${conf.socialMediaBaseUrl}/posts/get/my?page=${page}&limit=10`,
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
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetMyPostsQuery } = postsApiSlice;
