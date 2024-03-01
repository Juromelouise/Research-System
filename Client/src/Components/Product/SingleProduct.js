import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitlebarBelowImageList() {
  const [product, setProduct] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('fid')

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
