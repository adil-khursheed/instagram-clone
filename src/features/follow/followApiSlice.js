import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const followApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowersList: builder.query({
      query: ({ username, page }) => ({
        url: `${conf.socialMediaBaseUrl}/follow/list/followers/${username}?page=${page}&limit=10`,
      }),
      providesTags: ["Follow"],
    }),

    getFollowingToList: builder.query({
      query: ({ username, page }) => ({
        url: `${conf.socialMediaBaseUrl}/follow/list/following/${username}?page=${page}&limit=10`,
      }),
      providesTags: ["Follow"],
    }),

    followUnfollowUser: builder.mutation({
      query: (toBeFollowedUserId) => ({
        url: `${conf.socialMediaBaseUrl}/follow/${toBeFollowedUserId}`,
        method: "POST",
      }),
      invalidatesTags: ["Follow"],
    }),
  }),
});

export const {
  useGetFollowersListQuery,
  useGetFollowingToListQuery,
  useFollowUnfollowUserMutation,
} = followApiSlice;
