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

const SingleForum = () => {
  let { id } = useParams();
  const [content, setContent] = useState("");
  const [contents, setContents] = useState("");
  const [comments, setComments] = useState([]);
  const [forums, setForums] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleShowReplyModal = (comment) => {
    setSelectedComment(comment);
    setShowReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setSelectedComment(null);
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
    const formData = new FormData();
    formData.append("content", content);
    newComment(id, formData);
  };

  const newComment = async (id, commentdata, ) => {
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
      // console.log(data.success);
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

  const getPost = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/forum/single/post/${id}`
      );
      // console.log(data.forum.comments);
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

  const renderComments = (commentList, depth = 0) => {
    return commentList.map((comment) => (
      <MDBListGroupItem key={comment._id} className="d-flex align-items-center">
        <div className="flex-grow-1" style={{ marginLeft: `${depth * 20}px` }}>
          <strong>{comment.user.name}</strong> - {comment.content}
        </div>
        <Button variant="link" onClick={() => handleShowReplyModal(comment)}>
          Reply
        </Button>
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
          <h2 className="card-title">{forums?.title}</h2>
          <p className="card-text">{forums?.post}</p>
          <p className="text-muted">
            Posted on: {formatDate(forums?.createdAt)}
          </p>
          <form onSubmit={handleSubmit}>
            <MDBInput
              className="mx-auto"
              style={{ width: 800, height: 100 }}
              type="textarea"
              label="Add a comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <MDBBtn type="submit">Post Comment</MDBBtn>
          </form>
          <div className="mt-3">
            <h5 className="card-title">Comments</h5>
            <MDBListGroup>
              {comments.map((comment) => (
                <React.Fragment key={comment._id}>
                  {renderComments([comment])}
                </React.Fragment>
              ))}
            </MDBListGroup>
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
              label="Your Reply"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
            <MDBBtn type="submit">Post Reply</MDBBtn>
          </form>
        </Modal.Body>
      </Modal>
    </MDBContainer>
  );
};

export default SingleForum;
