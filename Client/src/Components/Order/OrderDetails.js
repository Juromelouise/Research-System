import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../Layout/Loader";
import axios from "axios";

import { getToken } from "../../utils/helpers";
import { Button } from "@mui/material";

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({});

  const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;
  const { id } = useParams();

  const getOrderDetails = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/order/order/${id}`,
        config
      );
      console.log(data.orders);
      setOrder(data.orders);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const setDelivered = async (id, iid) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      axios.put(
        `${process.env.REACT_APP_API}/order/delivered/order/${id}`,
        {},
        config
      );
      getOrderDetails(iid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails(id);

    if (error) {
      console.log(error);
    }
  }, [id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.baranggay}, ${shippingInfo.city}, ${shippingInfo.postal},`;
  return (
    <Fragment>
      {loading ? <Loader open={loading} /> : <></>}
      <div className="container mt-5" style={{ color: "white" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="order-details text-center">
              <h1 className="my-5">Order # {order._id}</h1>

              <div className="shipping-info mb-5">
                <h4>Shipping Info</h4>
                {user && (
                  <p>
                    <b>Name:</b> {user.name}
                  </p>
                )}
                {shippingInfo && (
                  <p>
                    <b>Phone:</b> {shippingInfo.phone}
                  </p>
                )}
                <p className="mb-0">
                  <b>Address:</b> {shippingDetails}
                </p>
              </div>

              <div className="payment-info mb-5">
                <h4>Payment</h4>
                {shippingInfo !== undefined && shippingInfo ? (
                  <p className="text-success">
                    <b>Cash on Delivery</b>
                  </p>
                ) : (
                  <p className="text-success">
                    <b>Pick up</b>
                  </p>
                )}
              </div>

              <div className="order-items mb-5">
                <h4 className="text-center mb-4">Order Items</h4>
                {orderItems &&
                  orderItems.map((item, index) => (
                    <div
                      key={item.product}
                      className="cart-item"
                      style={{ marginLeft: "150px" }}
                    >
                      <div className="row my-4 align-items-center">
                        <div className="col-12 col-lg-2 text-center">
                          <img
                            src={item.images}
                            alt={item.name}
                            height="45"
                            width="65"
                            className="img-fluid"
                          />
                        </div>
                        <Link to={`/single/user/product?fid=${item.seller._id}`} className="col-12 col-lg-4">
                        <div >{item.name}</div>
                        </Link>
                        <div className="col-6 col-lg-2 mt-3 mt-lg-0">
                          <p>₱{item.price}</p>
                        </div>
                        <div className="col-6 col-lg-2 mt-3 mt-lg-0">
                          <p>{item.quantity} Kg</p>
                        </div>
                        <div className="col-6 col-lg-2 mt-3 mt-lg-0">
                          <p>{item.orderStatus}</p>
                        </div>
                        {item.orderStatus === "Shipped/Ready To Pick up" ? (
                          <Button onClick={() => setDelivered(item._id, id)}>
                            Delivered
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                      {index !== orderItems.length - 1 && <hr />}{" "}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
