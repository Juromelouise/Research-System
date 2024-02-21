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

const SingleForum = () => {
  let { id } = useParams();
  const [comment, setComment] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [forums, setForums] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
     const {data} = await axios.post(
        `${process.env.REACT_APP_API}/comment/new/comment/${id}`,
        commentdata,
        config
      );
      console.log(data.success)
      setContent("");
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

  return (
    <MDBContainer style={{ marginTop: 20 }}>
      <MDBCard>
        <MDBCardBody>
          <h2 className="card-title">{forums.title}</h2>
          <p className="card-text">{forums.post}</p>
          <p className="text-muted">
            Posted on: {formatDate(forums.createdAt)}
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
              {comments.map((commen) => (
                <MDBListGroupItem>{commen.content}</MDBListGroupItem>
              ))}
            </MDBListGroup>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SingleForum;
