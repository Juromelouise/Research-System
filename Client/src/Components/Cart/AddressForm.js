import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShippingInfo } from "../../actions/cartActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";

export default function AddressForm({ isNext }) {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [baranggay, setBaranggay] = useState(shippingInfo.baranggay);
  const [city, setCity] = useState(shippingInfo.city);
  const [postal, setPostal] = useState(shippingInfo.postal);
  const [street, setStreet] = useState(shippingInfo.street);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(baranggay)
    dispatch(saveShippingInfo({ baranggay, city, street, postal }));

  }, [isNext])
  console.log(baranggay)
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(saveShippingInfo({ baranggay, city, street, postal }));
  // };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box component="form" noValidate
      // onSubmit={submitHandler}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="street"
              name="street"
              label="Street/House No./Block"
              fullWidth
              variant="standard"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="baranggay"
              name="baranggay"
              label="Baranggay"
              fullWidth
              variant="standard"
              value={baranggay}
              onChange={(e) => setBaranggay(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          {/* <Button type="submit">Ok</Button> */}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
