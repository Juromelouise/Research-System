import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../../utils/helpers";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import red from "@mui/material/colors/red";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const BrowseProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/products`,
          config
        );
        console.log(data);
        console.log(data.products);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    getAllProducts();
  }, []);

  const filterProductsByBaranggay = (baranggay) => {
    const filtered = products.filter(
      (product) => product.user && product.user.baranggay === baranggay
    );
    setFilteredProducts(filtered);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const allProducts = () => {
    setFilteredProducts(products);
    handleClose();
  };

  return (
    <MDBContainer>
      <MDBRow style={{ marginBottom: "20px", color: "white" }}>
        <MDBTypography variant="h3" className="mt-3">
          Sellers Onion
        </MDBTypography>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            color: "white",
          }}
        >
          <div>
            <Button
              variant="contained"
              onClick={handleClick}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              BARANGAY
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={allProducts}
              >
                All Baranggay
              </MenuItem>
              {products.map((baranggay) => (
                <MenuItem
                  onClick={() =>
                    filterProductsByBaranggay(baranggay.user.baranggay)
                  }
                >
                  {" "}
                  {baranggay.user.baranggay}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </MDBRow>
      <MDBRow>
        {filteredProducts?.map((product) => (
          <MDBCol sx={12} sm={6} md={6} lg={4} xl={4} className="mb-3">
            <Card key={product._id} sx={{ maxWidth: 600, bgcolor: "#01579b" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={product?.user?.avatar.url}
                    sx={{ bgcolor: red[500] }}
                  >
                    {product.user?.name ? product.user.name.charAt(0) : ""}
                  </Avatar>
                }
                title={product.name}
                subheader={product.user?.name || "Anonymous"}
              />
              <CardMedia
                component="img"
                height="194"
                image={
                  product?.images[0]?.url || "/images/onion-placeholder.jpg"
                }
                alt={product?.name + " avatar" || "User Avatar"}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  size="small"
                  onClick={() =>
                      navigate(`/signin?redirect=single/user/product?fid=${product?.user?._id}`)
                  }
                  style={{ color: "white" }}
                >
                  View Seller
                </Button>
              </CardActions>
            </Card>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default BrowseProduct;
