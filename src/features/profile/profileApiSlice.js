import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: `${conf.socialMediaBaseUrl}/profile`,
      }),
      providesTags: ["Profile"],
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `${conf.authBaseUrl}/avatar`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${conf.socialMediaBaseUrl}/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} = profileApiSlice;
