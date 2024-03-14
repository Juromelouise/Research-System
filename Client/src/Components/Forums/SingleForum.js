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
import { Box, IconButton, TextField, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Filter from 'bad-words'
import badWords from 'filipino-badwords-list'
import { filterText } from "../../utils/filterText";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleForum = () => {

  const filter = new Filter({ list: badWords.array });


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
        className="d-flex align-items-start flex-column my-3 justify-content-between "
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <div className="flex-grow-1 d-flex gap-2 align-items-center w-100">
          <img src={comment?.user?.avatar?.url} width={75} height={75} sx={{ objectFit: 'cover' }} />
          <div style={{ textAlign: 'left', }} className="d-flex justify-content-start w-100">
            <div className="me-auto">
              <Typography sx={{ fontWeight: 800 }}>{comment.user.name}</Typography>
              <pre><Typography dangerouslySetInnerHTML={{ __html: filterText(comment?.content) }}></Typography></pre>
            </div>
            {user ? (
              <div>
                <IconButton
                  variant="link"
                  onClick={() => handleShowReplyModal(comment)}
                >
                  <ReplyIcon />
                </IconButton>
                {comment.user._id === user._id ? (
                  <Button
                    variant="link"
                    onClick={() => deleteComment(comment._id, id)}
                  >
                    <DeleteIcon />
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            ) : (<></>)}
          </div>
        </div>
        {comment.comments.length > 0 && (
          <div className="ms-4 mb-1 w-100 ">
            {renderComments(comment.comments, depth + 1)}
          </div>
        )}
      </MDBListGroupItem>
    ));
  };

  return (
    <MDBContainer style={{ marginTop: 20 }}>
      <MDBCard style={{ width: '90%', margin: 'auto', }} className="px-4 py-4">
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
          ) : (<></>)}

          {/* <h2 className="card-title">{forums?.title}</h2>
          <p className="card-text">{forums?.post}</p>
          <p className="text-muted">
            Posted on: {formatDate(forums?.createdAt)}
          </p> */}
          <Box className='d-flex flex-column mb-3 gap-3 flex-md-row'>
            <img src={forums?.user?.avatar?.url} width={150} height={150} sx={{ width: '100%' }} />
            <Box className='' sx={{ textAlign: 'left' }}>
              <Typography variant="h3">{forums?.title}</Typography>
              <Typography variant="body" fontSize={30} fontWeight={200}>{forums?.post}</Typography>
              <Typography>Posted on {formatDate(forums?.createdAt)}</Typography>
              {forums?.user?._id === getUser()?._id ?
                <Typography>by You</Typography> :
                <Typography>by {forums?.user?.name}</Typography>
              }
            </Box>
          </Box>

          {user ? (
            <form onSubmit={handleSubmit} className="d-flex">
              <TextField
                multiline
                fullWidth
                className="mx-auto"
                type="textarea"
                label="Add a comment"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button style={{ maxHeight: 70, minWidth: 150, marginLeft: 20 }} type="submit">Post Comment</Button>
            </form>
          ) : (
            <>
              <h1>Login First</h1>
            </>
          )}

          <div className="mt-3 d-flex justify-content-center flex-column align-items-center ">
            <h5 className="card-title">Comments</h5>
            <MDBListGroup style={{ maxWidth: 900, width: '100%' }} className="d-flex justify-content-center">{renderComments(comments)}</MDBListGroup>
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
