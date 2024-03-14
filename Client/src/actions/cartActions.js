import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/api/v1/single/user/product/${id}`);
    console.log(data.user)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.user._id,
      name: data.user.name,
      price: data.user.price,
      images: data.user.images[0].url,
      description: data.user.description,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
