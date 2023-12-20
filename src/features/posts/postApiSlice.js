import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (page) => ({
        url: `${conf.socialMediaBaseUrl}/posts?page=${page}&limit=10`,
      }),
      providesTags: ["Post"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        console.log(currentCache);
        console.log(newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getMyPosts: builder.query({
      query: (page) => ({
        url: `${conf.socialMediaBaseUrl}/posts/get/my?page=${page}&limit=10`,
      }),
      providesTags: ["Post"],
    }),

    getPostsByUsername: builder.query({
      query: ({ username, page }) => ({
        url: `${conf.socialMediaBaseUrl}/posts/get/u/${username}?page=${page}&limit=10`,
      }),
      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: (postId) => ({
        url: `${conf.socialMediaBaseUrl}/posts/${postId}`,
      }),
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: `${conf.socialMediaBaseUrl}/posts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({ postId, ...data }) => ({
        url: `${conf.socialMediaBaseUrl}/posts/${postId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useGetPostsByUsernameQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
