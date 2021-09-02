import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./loginReducer";
import { toast } from "react-toastify";

const initialState = {
  userList: [],
  loading: false,
  error: null,
};

// async action for product fetching
export const getUsers = createAsyncThunk(
  "userList/getUserList",
  async (id, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    resetUserList: (state, action) => {
      state.loading = false;
      state.userList = [];
      state.error = null;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetUserList } = productSlice.actions;

export default productSlice.reducer;
