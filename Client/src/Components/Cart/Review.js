import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/helpers";
import { Loader } from "../Layout/Loader";
import { Button } from "@mui/material";
import axios from "axios";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];

export default function Review() {
  const [loading, setLoading] = useState(false);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const order = {
    orderItems: cartItems,
    shippingInfo,
    seller: cartItems.seller,
  };

  console.log(shippingInfo);

  // const createOrder = async (order) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     };
  //     await axios.post(
  //       `${process.env.REACT_APP_API}/order/neworder`,
  //       order,
  //       config
  //     );
  //     setLoading(false);
  //     // localStorage.clear();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <React.Fragment>
      {loading ? <Loader open={loading} /> : <></>}
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₱
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {shippingInfo.street !== '' || shippingInfo.baranggay !== '' || shippingInfo.city !== '' || shippingInfo.postal !== '' ? (
            <Typography gutterBottom>
              {shippingInfo.street}, {shippingInfo.baranggay},{" "}
              {shippingInfo.city}, {shippingInfo.postal}
            </Typography>
          ) : (
            <>
              <Typography gutterBottom>No Shipping, Pick Up</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
