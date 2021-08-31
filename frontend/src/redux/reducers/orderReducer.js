import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  order: [],
  loading: false,
  error: null,
  success: false,
};

// async order Items
export const createOrder = createAsyncThunk(
  "order/orderItem",
  async (info, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();

    try {
      const { data } = await axios.post("/api/orders", info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginInfo.token}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetOrder: (state, action) => {
      state.order = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
      toast.success("Order placed successfully!");
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { resetOrder } = registerSlice.actions;
export default registerSlice.reducer;
