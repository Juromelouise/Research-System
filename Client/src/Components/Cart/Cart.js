import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import Delete from "@mui/icons-material/Delete";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity) => {
    const qty = quantity + 1;
    setQuantity(qty);
    addToCart(id, qty);
  };

  const decreaseQty = (id, quantity) => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
    addToCart(id, qty);
  };

  const addToCart = (id, qty) => {
    dispatch(addItemToCart(id, qty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=checkout");
  };

  console.log(cartItems)
  return (
    <MDBContainer className="mt-2" style={{ borderRadius: 20 }}>
      {cartItems.length === 0 ? (
        <h2 className="mt-5" style={{ color: 'white' }}>Your Cart is Empty</h2>
      ) :
        (
          // <>
          //   <div className="cart-items">
          //     {cartItems.map((item) => (
          //       <div key={item.id} className="cart-item">
          //         <img src={item.images} alt={item.name} />

          //         <div className="cart-item-details">
          //           <h3>{item.name}</h3>
          //           <p>Price: ₱{item.price}</p>
          //           <Button
          //             onClick={() => decreaseQty(item.product)}
          //             className="count"
          //           >
          //             -
          //           </Button>
          //           <p>Quantity: {item.quantity}</p>
          //           <Button
          //             onClick={() => increaseQty(item.product)}
          //             className="count"
          //           >
          //             +
          //           </Button>
          //           <Button
          //             color="error"
          //             variant="contained"
          //             onClick={() => removeCartItemHandler(item.product)}
          //           >
          //             Remove Item
          //           </Button>
          //           <p>Total: ₱{item.price * item.quantity}</p>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          //   <div className="order-summary">
          //     <h3>Order Summary</h3>
          //     <p>
          //       Subtotal: ₱
          //       {cartItems.reduce(
          //         (acc, item) => acc + item.price * item.quantity,
          //         0
          //       )}
          //     </p>
          //     <p>Shipping: Free</p>
          //     <button onClick={checkoutHandler}>CHECKOUT</button>
          //   </div>
          // </>
          <section className="h-100 gradient-custom">
            <MDBContainer className="h-100">
              <MDBRow className="justify-content-center my-4">
                <MDBCol md="8">
                  <MDBCard className="mb-4">
                    <MDBCardHeader className="py-3">
                      <MDBTypography tag="h5" className="mb-0">
                        Cart - {cartItems?.length} item(s)
                      </MDBTypography>
                    </MDBCardHeader>
                    <MDBCardBody>
                      {cartItems?.map(item => (
                        <>
                          <MDBRow>
                            <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                              <MDBRipple rippleColor="light"
                                className="bg-image rounded hover-zoom hover-overlay">
                                <img
                                  src={item.images}
                                  className="w-100 object-fit-cover" style={{ height: 160, }} />
                              </MDBRipple>
                            </MDBCol>

                            <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0 d-flex flex-column align-items-start justify-content-between py-3">
                              <Typography variant="body" className="fw-bold fs-5 ">{item.name} </Typography>
                              <Typography variant="body" >{item.description} </Typography>
                              <Typography className="mb-3">Price: ₱{item.price}</Typography>
                              <Tooltip title='Remove Item'>
                                <Button variant="contained" color="error" onClick={() => removeCartItemHandler(item.product)}>
                                  <Delete />
                                </Button>
                              </Tooltip>
                            </MDBCol>

                            <MDBCol lg="4" md="6" className="mb-4 mb-lg-0 d-flex flex-column align-items-center">

                              <div className="d-flex mb-4 align-items-center gap-2" style={{ maxWidth: "300px" }}>
                                <Button onClick={() => decreaseQty(item.product, item.quantity)} variant="contained" className="rounded">
                                  <RemoveIcon />
                                </Button>

                                <MDBInput defaultValue={1} min={0} className="text-center" readonly value={item.quantity} />Kg

                                <Button onClick={() => increaseQty(item.product, item.quantity)} variant="contained" className="rounded">
                                  <AddIcon />
                                </Button>
                              </div>

                              <p className="text-start text-md-center fs-4">
                                <strong>₱{item.price * item.quantity}</strong>
                              </p>

                            </MDBCol>
                          </MDBRow>
                          <hr className="my-4" />
                        </>
                      ))}
                    </MDBCardBody>
                  </MDBCard>

                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="mb-4">
                    <MDBCardHeader>
                      <MDBTypography tag="h5" className="mb-0">
                        Summary
                      </MDBTypography>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <MDBListGroup flush >
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center px-2">
                          Shipping
                          <span>Free</span>
                        </MDBListGroupItem>
                        <MDBListGroupItem
                          className="d-flex justify-content-between align-items-center border-0 px-2 mb-3">
                          <div>
                            <strong>Subtotal</strong>
                          </div>
                          <span>
                            <strong>₱{cartItems.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0
                            )}</strong>
                          </span>
                        </MDBListGroupItem>
                      </MDBListGroup>

                      <Button onClick={checkoutHandler} variant="contained" color="success">
                        Go to checkout
                      </Button>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        )}
    </MDBContainer>
  );
};

export default Cart;
