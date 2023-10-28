import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import conf from "../../conf/conf";
import { toast } from "react-toastify";

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${conf.serverUrl}${conf.authBaseUrl}/register`,
        { email, username, password },
        config
      );

      if (data.success) {
        toast.success(data.message);
      }

      return data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/current-user",
  async () => {
    try {
      const { data } = await axios.get(
        `${conf.serverUrl}${conf.authBaseUrl}/current-user`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
