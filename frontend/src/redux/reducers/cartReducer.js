import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  loading: false,
  error: null,
  success: false,
};

// async action for product fetching
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (datas, { rejectWithValue }) => {
    const { id, qty } = datas;
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const index = state.cart.findIndex(
        (c) => c.product === action.payload.id
      );
      state.cart[index].qty = action.payload.qty;

      localStorage.setItem("cartList", JSON.stringify(state.cart));
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((c) => c.product !== action.payload);
      localStorage.setItem("cartList", JSON.stringify(state.cart));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.loading = true;
      state.success = true;
      state.error = null;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      const index = state.cart.findIndex(
        (c) => c.product === action.payload.product
      );
      if (index >= 0) {
        state.cart[index].qty = state.cart[index].qty + action.payload.qty;
      } else {
        state.cart.push(action.payload);
      }
      state.success = false;
      localStorage.setItem("cartList", JSON.stringify(state.cart));
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { updateCart, removeCart, saveShippingAddress } =
  productSlice.actions;
export default productSlice.reducer;
