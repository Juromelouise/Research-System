import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import { Modal, Button } from "react-bootstrap";
import { getUser } from "../../utils/helpers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, TextField, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SingleForum = () => {
  const user = getUser();
  const navigate = useNavigate();
  let { id } = useParams();
  const [content, setContent] = useState("");
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [forums, setForums] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateClick = async (forum) => {
    setupdateModal(true);
    getPostinfo(id);
    handleOptionsClose();
  };

  const handleDeleteClick = async (forum) => {
    console.log("Delete clicked for forum post", forum);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/forum/delete/post/${forum._id}`,
        config
      );
      navigate("/forum");
    } catch (error) {
      console.log(error);
    }
    handleOptionsClose();
  };

  const handleShowReplyModal = (comment) => {
    setSelectedComment(comment);
    setShowReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setSelectedComment(null);
  };

  const handleCloseUpdate = () => {
    setupdateModal(false);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    let iid = id;
    if (selectedComment) {
      const formData = new FormData();
      formData.append("content", contents);
      replyComment(selectedComment._id, formData, iid);
      handleCloseReplyModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === '') {
      toast('🧅 Comment should have laman !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return ''
    }
    const formData = new FormData();
    formData.append("content", content);
    newComment(id, formData);
  };

  const newComment = async (id, commentdata) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/comment/new/comment/${id}`,
        commentdata,
        config
      );
      setContent("");
      getPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const replyComment = async (id, formdata, iid) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/comment/comment/${id}`,
        formdata,
        config
      );
      setContents("");
      getPost(iid);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (iid, id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/comment/delete/comment/${iid}`,
        config
      );
      getPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/forum/single/post/${id}`
      );
      console.log(data.forum);
      setForums(data.forum);
      setComments(data.forum.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost(id);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("post", post);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    updatePost(formData);
    handleCloseUpdate();
  };

  const updatePost = async (formdata) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API}/forum/update/post/${id}`,
        formdata,
        config
      );
      getPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostinfo = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/forum/single/post/${id}`
      );
      setTitle(data.forum.title);
      setPost(data.forum.post);
    } catch (error) {
      console.log(error);
    }
  };

  const renderComments = (commentList, depth = 0) => {
    return commentList.map((comment) => (
      <MDBListGroupItem
        key={comment._id}
        className="d-flex align-items-start"
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <div className="flex-grow-1">
          <strong>{comment.user.name}</strong> -  <pre><Typography>{comment.content} </Typography></pre>
          {user ? (
            <>
              <Button
                variant="link"
                onClick={() => handleShowReplyModal(comment)}
              >
                Reply
              </Button>
              {comment.user._id === user._id ? (
                <Button
                  variant="link"
                  onClick={() => deleteComment(comment._id, id)}
                >
                  Delete Comment
                </Button>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        {comment.comments.length > 0 && (
          <MDBListGroup className="mt-2">
            {renderComments(comment.comments, depth + 1)}
          </MDBListGroup>
        )}
      </MDBListGroupItem>
    ));
  };

  return (
    <MDBContainer style={{ marginTop: 20 }}>
      <MDBCard>
        <MDBCardBody>
          {forums && forums?.user._id === user._id ? (
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <IconButton onClick={handleOptionsClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleOptionsClose}
              >
                <MenuItem onClick={() => handleUpdateClick(forums)}>
                  Update Post
                </MenuItem>
                <MenuItem onClick={() => handleDeleteClick(forums)}>
                  Delete Post
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <></>
          )}
          <h2 className="card-title">{forums?.title}</h2>
          <p className="card-text">{forums?.post}</p>
          <p className="text-muted">
            Posted on: {formatDate(forums?.createdAt)}
          </p>
          {user ? (
            <form onSubmit={handleSubmit} className="d-flex">
              <TextField
                multiline
                fullWidth
                sx={{ maxWidth: '85%' }}
                className="mx-auto"
                type="textarea"
                label="Add a comment"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button style={{ maxHeight: 50 }} type="submit">Post Comment</Button>
            </form>
          ) : (
            <>
              <h1>Login First</h1>
            </>
          )}

          <div className="mt-3">
            <h5 className="card-title">Comments</h5>
            <MDBListGroup>{renderComments(comments)}</MDBListGroup>
          </div>
        </MDBCardBody>
      </MDBCard>

      {/* Reply Modal */}
      <Modal show={showReplyModal} onHide={handleCloseReplyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleReplySubmit}>
            <MDBInput
              className="mx-auto"
              style={{ width: 300, height: 100 }}
              type="textarea"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
            <MDBBtn type="submit">Reply</MDBBtn>
          </form>
        </Modal.Body>
      </Modal>

      {/* Update Modal */}
      <Modal show={updateModal} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              {/* Label and Textarea for updating post content */}
              <label>Title</label>
              <MDBInput
                className="mx-auto"
                style={{ width: 300 }}
                type="textarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              {/* Label and Input field for updating forum title */}
              <label>Post</label>
              <MDBInput
                className="mx-auto"
                style={{ width: 300 }}
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>

            <MDBBtn type="submit">Update Post and Title</MDBBtn>
          </form>
        </Modal.Body>
      </Modal>
    </MDBContainer>
  );
};

export default SingleForum;
