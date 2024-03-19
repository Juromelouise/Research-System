import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Loader} from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getToken } from "../../utils/helpers";

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({});

  const {
    shippingInfo,
    orderItems,
    user,
    mod,
    totalPrice,
    orderStatus,
  } = order;
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
      console.log(error)
    }
  };

  useEffect(() => {
    getOrderDetails(id);

    if (error) {
      // toast.error(error, {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
      console.log(error)
    }
  }, [ id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.baranggay}, ${shippingInfo.city}, ${shippingInfo.postal},`;
  const isPaid = mod && mod.status === "succeeded";

  return (
    <Fragment>

      {loading ? (
        <Loader open={loading}/>
      ) : (
        <Fragment>
          <div className="row justify-content-center align-items-center" style={{color: "white"}}>
            <div className="col-12 col-lg-8 mt-5 order-details text-center">
              <h1 className="my-5">Order # {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
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
              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ₱{totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              {order.orderStatus && (
                <p
                  className={
                    String(order.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
              )}

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.images}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>₱{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;