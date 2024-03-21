import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import { getUser } from "../../utils/helpers";
import { Box, Typography } from "@mui/material";

const DeletedSingleForum = () => {
  const [user, setUser] = useState("");
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  const [forums, setForums] = useState("");

  const getPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/forum/admin/single/post/${id}`,
        config
      );
      console.log(data.forum);
      setForums(data.forum[0]);
      setUser(data.forum[0].user);
      setComments(data.forum[0].comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
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
      <MDBListGroupItem
        key={comment._id}
        className="d-flex align-items-start flex-column my-3 justify-content-between "
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <div className="flex-grow-1 d-flex gap-2 align-items-center w-100">
          <img
            src={comment?.user?.avatar?.url}
            width={75}
            height={75}
            sx={{ objectFit: "cover" }}
          />
          <div
            style={{ textAlign: "left" }}
            className="d-flex justify-content-start w-100"
          >
            <div className="me-auto">
              <Typography sx={{ fontWeight: 800 }}>
                {comment.user.name}
              </Typography>
              <pre>
                <Typography>{comment.content}</Typography>
              </pre>
            </div>
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
    <>
      <MDBContainer style={{ marginTop: 20 }}>
        <MDBCard style={{ width: "90%", margin: "auto" }} className="px-4 py-4">
          <MDBCardBody>
            <Box className="d-flex flex-column mb-3 gap-3 flex-md-row">
              {user && user.avatar && (
                <img
                  src={user?.avatar?.url}
                  width={150}
                  height={150}
                  sx={{ width: "100%" }}
                />
              )}
              <Box className="" sx={{ textAlign: "left" }}>
                <Typography variant="h3">{forums?.title}</Typography>
                <Typography variant="body" fontSize={30} fontWeight={200}>
                  {forums.post}
                </Typography>
                <Typography>
                  Posted on {formatDate(forums.createdAt)}
                </Typography>
                {user?._id === getUser()?._id ? (
                  <Typography>by You</Typography>
                ) : (
                  <Typography>by {user?.name}</Typography>
                )}
              </Box>
            </Box>
            <div className="mt-3 d-flex justify-content-center flex-column align-items-center ">
              <h5 className="card-title">Comments</h5>
              <MDBListGroup
                style={{ maxWidth: 900, width: "100%" }}
                className="d-flex justify-content-center"
              >
                {renderComments(comments)}
              </MDBListGroup>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default DeletedSingleForum;
