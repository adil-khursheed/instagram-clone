import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import conf from "../../conf/conf";

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async ({ pagination }) => {
    try {
      let queryString = "";

      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }

      const { data } = await axios.get(
        `${conf.serverUrl}${conf.socialMediaBaseUrl}/posts/get/my?${queryString}`,
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
