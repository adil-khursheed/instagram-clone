import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import profileReducer from "../../features/profile/profileSlice";
import postsReducer from "../../features/posts/postSlice";
import { apiSlice } from "../api/apiSlice";
import conf from "../../conf/conf";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: conf.nodeEnv !== "production",
});

export default store;
