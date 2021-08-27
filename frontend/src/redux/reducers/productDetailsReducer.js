import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: { reviews: [] },
  loading: false,
  error: null,
};

// async action for product fetching
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default productDetailsSlice.reducer;
