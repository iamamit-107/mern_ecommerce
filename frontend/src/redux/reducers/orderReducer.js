import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  order: [],
  singleOrder: {},
  singleOrderSuccess: false,
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
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const getOrderById = createAsyncThunk(
  "order/sigleOrder",
  async (id, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();

    try {
      const { data } = await axios.get(`/api/orders/${id}`, {
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

const registerSlice = createSlice({
  name: "order",
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
      state.success = false;
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
    [getOrderById.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.singleOrderSuccess = false;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleOrder = action.payload;
      state.singleOrderSuccess = true;
    },
    [getOrderById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.singleOrderSuccess = false;
    },
  },
});

export const { resetOrder } = registerSlice.actions;
export default registerSlice.reducer;
