import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,  
} from "redux";
import { thunk } from "redux-thunk";

import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({
    cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  user: {},
  auth: {},
};

const middlware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middlware));

export default store;
