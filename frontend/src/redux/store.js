import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import loginReducer from "./reducers/loginReducer";
import productDetailsSlice from "./reducers/productDetailsReducer";
import productSlice from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productLists: productSlice,
    productDetails: productDetailsSlice,
    cartList: cartReducer,
    loginUser: loginReducer,
  },
});
