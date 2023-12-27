import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostComment: builder.query({
      query: ({ postId, page }) => ({
        url: `${conf.socialMediaBaseUrl}/comments/post/${postId}?page=${page}&limit=10`,
      }),
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation({
      query: ({ postId, data }) => ({
        url: `${conf.socialMediaBaseUrl}/comments/post/${postId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),

    likeUnlikeComment: builder.mutation({
      query: (commentId) => ({
        url: `${conf.socialMediaBaseUrl}/like/comment/${commentId}`,
        method: "POST",
      }),
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${conf.socialMediaBaseUrl}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetPostCommentQuery,
  useAddCommentMutation,
  useLikeUnlikeCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
