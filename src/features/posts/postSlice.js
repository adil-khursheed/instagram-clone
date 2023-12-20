import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  page: 1,
  hasNextPage: true,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // .addCase(useGetMyPostsQuery.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(useGetMyPostsQuery.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.posts = [...action.payload.data.posts, ...state.posts];
    //   state.page += 1;
    //   state.hasNextPage = action.payload.data.hasNextPage;
    // })
    // .addCase(useGetMyPostsQuery.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.posts.posts;
export const selectTotalPosts = (state) => state.posts.totalPosts;
