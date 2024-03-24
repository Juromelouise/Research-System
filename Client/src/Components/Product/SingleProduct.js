import * as React from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
} from "mdb-react-ui-kit";
import { getToken, getUser } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Loader } from "../Layout/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { Modal } from "react-bootstrap";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { addItemToCart } from "../../actions/cartActions";

const SingleProduct = () => {
  const [user, setUser] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const [content, setContent] = useState("");
  const [contentID, setContentID] = useState("");
  const [sid, setSid] = useState("");
  const [order, setOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const id = query.get("fid");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleShowReplyModal = () => {
    setShowReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
  };

  const handleOptionsClick = (event, revi) => {
    setAnchorEl(event.currentTarget);
    setContent(revi.comment.content);
    setContentID(revi.comment._id);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
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
      if (data.product.length > 0) {
        const newSid = data.product[0].user._id;
        setSid(newSid);
        setProduct(data.product);
        console.log(data.product);
        setUser(data.user);
        const filteredReviews = data.user.reviews.filter(
          (review) => review.comment !== null
        );
        setReviews(filteredReviews);
        console.log(filteredReviews);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/order/check/${id}`,
        config
      );
      setOrder(data.success);
      console.log(data.success);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/comment/delete/comment/${id}`,
        config
      );
      toast(`Review has been deleted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getProduct();
      setLoading(false);
    } catch (err) {
      console.log(err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      toast(`Put a Review`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return null;
    }
    const formData = new FormData();
    formData.set("content", comment);
    setLoading(true);
    handleCloseModal();
    review(user._id, formData);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (content === "") {
      toast(`Must have a input`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return null;
    }
    const formData = new FormData();
    formData.set("content", content);
    setLoading(true);
    handleCloseReplyModal();
    updateReview(contentID, formData);
  };

  const updateReview = async (id, comment) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API}/comment/content/update/${id}`,
        comment,
        config
      );
      toast(`Review has been updated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getProduct();
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const review = async (id, formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/review/user/${id}`,
        formData,
        config
      );
      toast(`Review has been Posted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getProduct();
      setLoading(false);
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
      toast(`Product has been deleted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProduct();
    getOrders();
  }, []);

  useEffect(() => {
    getSupplier();
  }, [sid]);

  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity));
    toast(`Product has been added to Cart`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
                  {getUser()._id !== user._id && getUser().role !== "supplier" && getUser().role !== "admin" ? (
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
                  ) : (
                    <></>
                  )}
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
            {/*For Button Modal */}
            {order && order ? (
              <IconButton
                color="white"
                aria-label="Open Modal"
                onClick={handleOpenModal}
                sx={{
                  position: "fixed",
                  bottom: 20,
                  right: 20,
                  backgroundColor: "info.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 20px",
                  borderRadius: 4,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <AddIcon />
                <Typography sx={{ marginLeft: 1 }}>Post a Review</Typography>
              </IconButton>
            ) : (
              <></>
            )}

            {/* For Reviews */}
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Reviews</DialogTitle>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                {/*Update and Delete reviews */}

                {/* <Box component="form"> */}
                <DialogContent>
                  <TextField
                    label="Review"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Post
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row justify-content-center">
        <h1 style={{ color: "white" }}>
          <strong>All Reviews</strong>
        </h1>
        <div className="col-lg-8">
          {reviews.map((review) => (
            <div className="card mb-4" key={review._id}>
              <div className="card-body" style={{ position: "relative" }}>
                <div className="row">
                  <div className="col-md-3">
                    <img
                      src={review.user?.avatar.url}
                      className="rounded-circle"
                      alt="User Avatar"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <h3>Posted by: {review.user.name}</h3>
                    <p>{review.comment.content}</p>
                  </div>
                  {/* More icon positioned on the upper right corner */}
                  {review?.user?._id === getUser()._id ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: -480,
                        padding: "4px",
                        zIndex: 1,
                      }}
                    >
                      <IconButton
                        onClick={(e) => handleOptionsClick(e, review)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleOptionsClose}
                      >
                        <MenuItem onClick={() => handleShowReplyModal()}>
                          Update Post
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            deleteReview(contentID);
                            setLoading(true);
                          }}
                        >
                          Delete Post
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showReplyModal} onHide={handleCloseReplyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit2}>
            <MDBInput
              className="mx-auto"
              style={{ width: 300, height: 100 }}
              type="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit">Edit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleProduct;
