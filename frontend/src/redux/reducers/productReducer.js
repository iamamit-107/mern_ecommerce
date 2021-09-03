import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  loading: false,
  error: null,
  deleteLoading: false,
  deleteError: null,
};

// async action for product fetching
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue, getState }) => {
    const {
      loginUser: { loginInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
        },
      });
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.deleteLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.products = state.products.filter(
        (p) => p._id !== action.payload.id
      );
      toast.success(action.payload.data.message);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.error.message;
      toast.error(action.error.message);
    },
  },
});

export default productSlice.reducer;
