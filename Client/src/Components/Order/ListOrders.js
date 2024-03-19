import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Loader } from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../utils/helpers";
import { Button } from "@mui/material";

const ListOrders = () => {
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
        `${process.env.REACT_APP_API}/order/orders/me`,
        config
      );
      console.log(data);
      setMyOrdersList(data.orders);
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
  }, [error]);

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
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        date: formatDate(order?.createdAt),
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

export default ListOrders;
