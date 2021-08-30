import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./loginReducer";

const initialState = {
  registerInfo: [],
  loading: false,
  error: null,
};

// async action for product fetching
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (info, { rejectWithValue, dispatch }) => {
    const { name, email, password } = info;
    try {
      const {
        data: { createdUser },
      } = await axios.post(
        "/api/users",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(login(createdUser));
      return createdUser;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.registerInfo = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default registerSlice.reducer;
