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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";

const SingleProduct = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [sid, setSid] = useState("");
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
      const newSid = data.product[0].user._id;
      setSid(newSid);
      setProduct(data.product);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const uniqueSuppliers = new Set();
  const getSupplier = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/order/supplier/${sid}`,
        config
      );
      setSupplier(data.supplier);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(supplier);
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

  useEffect(() => {
    getSupplier();
  }, [sid]);

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
            <div className="card-body" style={{ height: "780px" }}>
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
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}>
                    <strong>Ceritifed:</strong>
                  </p>
                </div>
                <div className="col-sm-9" style={{ textAlign: "justify" }}>
                  <p>{user.certified}</p>
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
                      <p>{user.fertilizer}</p>
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
                </>
              )}
            </tbody>

            {user.role !== "supplier" && (
              <>
                <thead>
                  <tr>
                    <th scope="col">SUPPLIER INFORMATION</th>
                  </tr>
                </thead>

                {supplier &&
                  supplier.map((items) =>
                    items.orderItems.map((item) => {
                      if (!uniqueSuppliers.has(item.seller._id)) {
                        uniqueSuppliers.add(item.seller._id);
                        return (
                          <thead key={item.seller._id}>
                            {" "}
                            {/* Ensure each element has a unique key */}
                            <tr>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={item?.seller?.avatar?.url}
                                  className="rounded-circle"
                                  alt="pic"
                                  style={{
                                    height: 50,
                                    width: 50,
                                    border: "none",
                                  }}
                                />
                                <table>
                                  <tbody>
                                    {" "}
                                    {/* Use tbody instead of tr */}
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{
                                          height: "50px",
                                          width: "1000px",
                                          marginRight: "20px",
                                        }}
                                      >
                                        {item.seller.name}
                                      </th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </tr>
                            <button
                              onClick={() => {
                                navigate(
                                  `/single/user/product?fid=${item.seller._id}`
                                );
                                window.location.reload();
                              }}
                              style={{
                                backgroundColor: "#5D0664",
                                color: "#fff",
                                padding: "12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              More Info
                            </button>
                            <hr />
                          </thead>
                        );
                      }
                      return null;
                    })
                  )}
              </>
            )}
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
              justifyContent: "center",
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
                  {getUser()._id === user._id ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
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
