import * as React from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { getToken, getUser } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Loader } from "../Layout/Loader";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";

const SingleProduct = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
      console.log(data.user);
      setProduct(data.product);
      setUser(data.user);
      console.log(data.user);
      console;
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

  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity));
    alert("Item Added to Card");
  };

  return (
    <>
      {loading ? <Loader open={loading} /> : <></>}
      <div
        className="row justify-content-center"
        style={{ marginLeft: "200px" }}
      >
        <div className="col-lg-8">
          <hr />
          <div className="card mb-4" style={{ width: "800px" }}>
            {" "}
            {/* Adjust width as needed */}
            <div className="card-body" style={{ height: "700px" }}>
              {" "}
              {/* Adjust height as needed */}
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <h2 style={{ color: "black", fontSize: "29px" }}>
                    <strong>PERSONAL INFORMATION</strong>
                  </h2>
                </div>
              </div>
              <div className="row">
                <hr />
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>NAME:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>BARANGAY:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.baranggay}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>CITY:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.city}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>EMAIL:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>PHONE NUMBER:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.phone}</p>
                </div>
              </div>
              <hr />
              {user.role === "supplier" ? (
                <>
                  {" "}
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0" style={{ textAlign: "justify" }}>
                        <strong>DESCRIPTION:</strong>
                      </p>
                    </div>
                    <div className="col-sm-9" style={{ textAlign: "justify" }}>
                      <p>{user.description}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0" style={{ textAlign: "justify" }}>
                        <strong>SEASONS:</strong>
                      </p>
                    </div>
                    <div className="col-sm-9" style={{ textAlign: "justify" }}>
                      <p>{user.season}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0" style={{ textAlign: "justify" }}>
                        <strong>FERTILIZER:</strong>
                      </p>
                    </div>
                    <div className="col-sm-9" style={{ textAlign: "justify" }}>
                      <p>{user.season}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0" style={{ textAlign: "justify" }}>
                        <strong>ONION TYPE:</strong>
                      </p>
                    </div>
                    <div className="col-sm-9" style={{ textAlign: "justify" }}>
                      <p>{user.type}</p>
                    </div>
                  </div>
                  <hr />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">IMPORTANT DOCUMENT</th>
              </tr>
              <hr />
            </thead>
            <tbody>
              {user && user.attachment && (
                <>
                  <img
                    src={user.attachment[0]?.url}
                    className="img-thumbnail"
                    alt="..."
                  />
                  <hr />
                  <img
                    src={user.attachment[1]?.url}
                    className="img-thumbnail"
                    alt="..."
                  />
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center">
        <h1 style={{ color: "white" }}>
          <strong>All PRODUCTS</strong>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center", // Align items horizontally in center
            }}
          >
            {product.map((product) => (
              <MDBCard
                key={product._id}
                style={{
                  width: "300px",
                  height: "400px",
                  marginBottom: "20px",
                  marginLeft: "40px",
                }}
              >
                <MDBCardImage
                  src={product.images[0].url}
                  position="top"
                  alt="..."
                  style={{ height: "200px", width: "300px" }}
                />
                <MDBCardBody>
                  <MDBCardTitle>{product.name}</MDBCardTitle>
                  <MDBCardText style={{ textAlign: "left" }}>
                    {product.description}
                  </MDBCardText>
                  <Button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#000957",
                      color: "white",
                    }}
                    onClick={() => {
                      addToCart(product._id);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Link to={`/product/update/${product._id}`}>
                    <Button
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#000957",
                        color: "white",
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    style={{ backgroundColor: "#000957", color: "white" }}
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  >
                    Delete
                  </Button>
                </MDBCardBody>
              </MDBCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
