import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import conf from "../../conf/conf";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${conf.serverUrl}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log("sending refresh token");

    // sending refresh token to get new access token
    const refreshResult = await baseQuery(
      `${conf.authBaseUrl}/refresh-token`,
      api,
      extraOptions
    );
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Profile", "Post"],
  endpoints: (builder) => ({}),
});
