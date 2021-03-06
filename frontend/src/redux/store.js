import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import loginReducer from "./reducers/loginReducer";
import orderReducer from "./reducers/orderReducer";
import productDetailsSlice from "./reducers/productDetailsReducer";
import productSlice from "./reducers/productReducer";
import registerReducer from "./reducers/registerReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import userListReducer from "./reducers/userListReducer";

export const store = configureStore({
  reducer: {
    productLists: productSlice,
    productDetails: productDetailsSlice,
    cartList: cartReducer,
    loginUser: loginReducer,
    registerUser: registerReducer,
    userDetails: userDetailsReducer,
    orders: orderReducer,
    users: userListReducer,
  },
});
