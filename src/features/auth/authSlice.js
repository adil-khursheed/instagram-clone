import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authAction";

const initialState = {
  loading: false,
  // status: false,
  user: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
  token: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload.data;
      state.user = user;
      localStorage.setItem("userData", JSON.stringify(user));
      state.token = accessToken;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userData");
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
