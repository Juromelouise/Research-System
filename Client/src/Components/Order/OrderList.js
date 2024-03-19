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
  const [filetredOrder, setFiletredOrder] = useState([]);

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
      filterOrders();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const filterOrders = async () => {
    const filteredOrders = myOrdersList.map((orderArray) =>
      orderArray.orderItems.map((order) =>
        order.filter((item) => {
          console.log("Item user ID:", item.user);
          console.log("User ID:", user._id);
          item.seller === user._id;
        })
      )
    );
    console.log("Filtered orders:", filteredOrders);
    setFiletredOrder(filteredOrders);
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
          label: "Num of Items",
          field: "numOfItems",
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

    filetredOrder.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        date: formatDate(order?.createdAt),
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`}>
            <Button variant="contained" color="primary">
              Check Order
            </Button>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <h1 style={{ color: "white" }}>My Orders</h1>
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
