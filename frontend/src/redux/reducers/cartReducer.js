import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [],
  loading: false,
  error: null,
  success: false,
};

// async action for product fetching
export const addToCart = createAsyncThunk("cart/addToCart", async (datas) => {
  const { id, qty } = datas;
  const { data } = await axios.get(`/api/products/${id}`);
  return {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  };
});

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
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.cart.findIndex(
        (c) => c.product === action.payload.product
      );
      if (index >= 0) {
        state.cart[index].qty = state.cart[index].qty + action.payload.qty;
      } else {
        state.cart.push(action.payload);
      }

      state.success = true;
      localStorage.setItem("cartList", JSON.stringify(state.cart));
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    },
  },
});

export const { updateCart } = productSlice.actions;
export default productSlice.reducer;
