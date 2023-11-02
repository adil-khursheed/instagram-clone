import { createSlice } from "@reduxjs/toolkit";
import { getMyPosts } from "./postAction";

const initialState = {
  loading: false,
  posts: [],
  totalPosts: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data.posts;
        state.totalPosts = action.payload.data.totalPosts;
      })
      .addCase(getMyPosts.rejected, (state) => {
        state.loading = false;
        state.posts = [];
        state.totalPosts = 0;
      });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.posts.posts;
export const selectTotalPosts = (state) => state.posts.totalPosts;
