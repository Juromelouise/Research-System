import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate('/signin?redirect=checkout')
}

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <>
              {" "}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.images} alt={item.name} />

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>
                  Subtotal: $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </p>
                <p>Shipping: Free</p>
                <button onClick={checkoutHandler}>CHECKOUT</button>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
