import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import { getToken, getUser } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

export default function TitlebarBelowImageList() {
  const user = getUser();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("fid");

  const getProduct = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/single/product?fid=${id}`,
        config
      );
      console.log(data.product);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        padding: "20px",
      }}
    >
      {product.length > 0 && product[0].user._id === user._id ? (
        <Link to="/product/create">
          <Button>Add Product</Button>
        </Link>
      ) : (
        <></>
      )}
      <h1 style={{ color: "white" }}>All Products</h1>
      <ImageList sx={{ width: 1000, height: 600 }}>
        {product.map((item) => (
          <ImageListItem key={item.images[0].url}>
            {item.images.map((image) => (
              <img
                key={image.url}
                srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.url}?w=248&fit=crop&auto=format`}
                loading="lazy"
              />
            ))}
            <ImageListItemBar
              title={item.name}
              subtitle={<span>by: {item.user.name}</span>}
              position="below"
              style={{ color: "white" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
