import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import conf from "../../conf/conf";

export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async () => {
    try {
      const { data } = await axios.get(
        `${conf.serverUrl}${conf.socialMediaBaseUrl}/profile`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }
);
