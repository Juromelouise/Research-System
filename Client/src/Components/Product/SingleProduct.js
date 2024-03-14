import * as React from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
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
  const user = getUser();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
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
                  <p className="mb-0">AGE:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.age}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">GENDER:</p>
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
          <h1 style={{ color: "white" }}>All Products</h1>
          <MDBRow className="row-cols-1 row-cols-md-5 g-4">
            {product.map((item) => (
              <MDBCol>
                <MDBCard className="h-100">
                  <MDBCardImage
                    src={item.images[0].url}
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{item.name}</MDBCardTitle>
                    <MDBCardText>{item.description}</MDBCardText>
                    <MDBCardText>${item.price}</MDBCardText>
                    <Link to={`/product/update/${item._id}`}>
                      <Button>
                        Edit
                      </Button>
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
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
