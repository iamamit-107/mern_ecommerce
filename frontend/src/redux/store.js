import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productLists: productSlice,
  },
});
