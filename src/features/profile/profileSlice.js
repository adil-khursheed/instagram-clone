import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "./profileAction";

const initialState = {
  loading: false,
  userProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.data;
      })
      .addCase(getMyProfile.rejected, (state) => {
        state.loading = false;
        state.userProfile = null;
      });
  },
});

export default profileSlice.reducer;

export const selectCurrentUserProfile = (state) => state.profile.userProfile;
export const selectUserProfileLoading = (state) => state.profile.loading;
