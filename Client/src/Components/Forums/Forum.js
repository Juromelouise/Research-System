import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Forum = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [forum, setForum] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const newPost = async (Data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API}/forum/new/post`,
        Data,
        config
      );
      console.log(data.forum);
      setTitle("");
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPost = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/forum/all/post`
    );
    console.log(data.forum);
    setForum(data.forum);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("post", post);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    newPost(formData);
    handleCloseModal();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Arrange items in a column
        alignItems: "center", // Center items horizontally
        gap: 2,
        marginTop: 1,
        padding: 4,
      }}
    >
      {forum.map((forums) => (
        <Card
          key={forums._id}
          variant="outlined"
          sx={{
            width: 1200,
            marginBottom: 1,
            height: 135,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 60, height: 60, marginRight: 2, marginLeft: 2 }}
            alt={`Avatar ${forums.post}`}
          >
            {1}
          </Avatar>
          <React.Fragment>
            <CardContent>
              <Typography variant="h3" component="div">
                {forums.title}
              </Typography>
              <Typography variant="body2">
                {forums.user.name}
                <br />
                {forums.post}
              </Typography>
            </CardContent>
          </React.Fragment>
          <IconButton
            color="primary"
            aria-label="Comments"
            sx={{
              marginLeft: "auto", // Align to the right (end) of the card
              backgroundColor: "#f5f5f5", // Light gray background
              position: "absolute", // Positioning absolute
              bottom: 5, // Distance from the bottom
              right: 5, // Distance from the right
            }}
          >
            <CommentIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              5 {/* Replace with the actual number of comments */}
            </Typography>
          </IconButton>
        </Card>
      ))}
      <IconButton
        color="primary"
        aria-label="Open Modal"
        onClick={handleOpenModal}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#00e5ff",
          "&:hover": {
            backgroundColor: "#00a0b2",
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
        <Typography sx={{ marginLeft: 1 }}>Start a new Discussion</Typography>
      </IconButton>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create a New Discussion</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Post"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              value={post}
              onChange={(e) => setPost(e.target.value)}
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
    </Box>
  );
};

export default Forum;
