import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Loader } from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, getUser } from "../../utils/helpers";
import { Button } from "@mui/material";

const OrderList = () => {
  const user = getUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myOrdersList, setMyOrdersList] = useState([]);

  const myOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/order/my/orders`,
        config
      );
      console.log(data.orders);
      setMyOrdersList(data.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const UpdateStatus = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/order/update/order/${id}`,
        {},
        config
      );
      console.log(data.orders);
      myOrders();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const CancelOrder = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/order/cancel/order/${id}`,
        {},
        config
      );
      myOrders();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const ShippedOrder = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/order/shipped/order/${id}`,
        {},
        config
      );
      myOrders();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    myOrders();
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "User ID",
          field: "uid",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    myOrdersList.forEach((order) => {
      data.rows.push({
        id: order._id,
        uid: order.user._id,
        amount: `$${order.price}`,
        date: formatDate(order?.createdAt),
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions:
          order.orderStatus && order.orderStatus === "Waiting to Confirm" ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  UpdateStatus(order._id);
                  setLoading(true);
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  CancelOrder(order._id);
                  setLoading(true);
                }}
              >
                Cancel
              </Button>
            </>
          ) : order.orderStatus === "Confirmed" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                ShippedOrder(order._id);
                setLoading(true);
              }}
            >
              Ship
            </Button>
          ) : order.orderStatus === "Canceled" ? (
            <></>
          ) : (
            <></>
          ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <h1 style={{ color: "white" }}>Product Orders</h1>
      {loading ? (
        <Loader open={loading} />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default OrderList;
