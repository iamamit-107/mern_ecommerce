import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  order: [],
  singleOrder: null,
  singleOrderSuccess: false,
  loading: false,
  error: null,
  success: false,
  payOrder: {},
  payOrderLoading: false,
  payOrderSuccess: false,
  payOrderError: null,
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
export const updatePay = createAsyncThunk(
  "order/updatePay",
  async (info, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/orders/${info.id}/pay`,
        info.paypalResult,
        {
          "Content-Type": "application/json",
          headers: {
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
    resetSingleOrder: (state, action) => {
      state.singleOrder = null;
      state.singleOrderSuccess = false;
      state.error = null;
    },
    resetPayOrder: (state, action) => {
      state.payOrder = {};
      state.payOrderLoading = false;
      state.payOrderSuccess = false;
      state.payOrderError = null;
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
    [updatePay.pending]: (state, action) => {
      state.payOrderLoading = true;
      state.error = null;
      state.singleOrderSuccess = false;
    },
    [updatePay.fulfilled]: (state, action) => {
      state.payOrderLoading = false;
      state.payOrder = action.payload;
      state.payOrderSuccess = true;
    },
    [updatePay.rejected]: (state, action) => {
      state.payOrderLoading = false;
      state.payOrderError = action.payload;
      state.payOrderSuccess = false;
    },
  },
});

export const { resetOrder, resetPayOrder, resetSingleOrder } =
  registerSlice.actions;
export default registerSlice.reducer;
