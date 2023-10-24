import { apiSlice } from "../../app/api/apiSlice";
import conf from "../../conf/conf";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: `${conf.socialMediaBaseUrl}/profile`,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `${conf.authBaseUrl}/avatar`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateAvatarMutation } =
  profileApiSlice;
