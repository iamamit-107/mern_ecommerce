import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./loginReducer";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

// async action for product fetching
export const getUserProfile = createAsyncThunk(
  "profile/userProfile",
  async (id, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `/api/users/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginInfo.token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// async action for product fetching
export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (info, { rejectWithValue, getState, dispatch }) => {
    const {
      loginUser: { loginInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/users/profile`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginInfo.token}`,
        },
      });
      toast.success("Successfully Updated!");
      dispatch(login(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserProfile.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUserProfile.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
