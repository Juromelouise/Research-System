import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import { getToken, getUser } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";
import { Button } from "@mui/material";
import { Loader } from "../Layout/Loader";

export default function TitlebarBelowImageList() {
  const user = getUser();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("fid");

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity));
    alert("Item Added to Cart");
  };

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

  const deleteProduct = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/delete/product/${id}`,
        config
      );
      setLoading(false);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {loading ? <Loader open={loading} /> : <></>}
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <h2 style={{ color: "black", fontSize: "36px" }}>
                    Personal Information
                  </h2>
                </div>
              </div>
              <div className="row">
                <hr />
                <div className="col-sm-3">
                  <p className="mb-0">NAME:</p>
                </div>
                <div className="col-sm-9">
                  <p>{user.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">BARANGAY:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.age}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">CITY:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.gender}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">LOCATION:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {user.baranggay}, {user.city}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">EMAIL:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">LOCATION:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">PHONE NUMBER:</p>
                </div>
                <div className="col-sm-9">
                  {/* Access user object */}
                  <p className="text-muted mb-0">{user.phone}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">EMAIL:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">SEASON:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.gender}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">FERTILIZER:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.gender}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">ONION TYPE:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.gender}</p>
                </div>
              </div>
              <hr />

            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Business Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">Column 1</th>
                <th scope="col">Column 2</th>
              </tr>
              <tr>
                <td>Data 3</td>
                <td>Data 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
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
                <Link to={`/product/update/${item._id}`}>
                  <Button>Edit</Button>{" "}
                </Link>
                <Button
                  onClick={() => {
                    deleteProduct(item._id);
                    setLoading(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    addToCart(item._id);
                  }}
                >
                  Add to Cart
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </>
  );
}
