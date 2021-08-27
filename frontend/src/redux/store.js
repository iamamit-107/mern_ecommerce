import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./reducers/productDetailsReducer";
import productSlice from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productLists: productSlice,
    productDetails: productDetailsSlice,
  },
});
