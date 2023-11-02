import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, registerUser } from "./authAction";

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
      const { data } = action.payload;
      state.user = data.user;
      localStorage.setItem("userData", JSON.stringify(data.user));
      state.token = data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userData");
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
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
      })

      // get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
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
