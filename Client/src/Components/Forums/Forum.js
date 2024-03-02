import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/helpers";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Grid } from "@mui/material";

const Forum = () => {
  const user = getUser();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [forum, setForum] = useState([]);
  const [filteredforums, setFilteredforums] = useState([]);
  const [search, setSearch] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newPost = async (Data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/forum/new/post`,
        Data,
        config
      );
      setForum(data.forum);
      setTitle("");
      getAllPost();
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPost = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/forum/all/post`
    );
    // console.log(data.forum);
    setFilteredforums(data.forum);
    setForum(data.forum);
  };

  const handleSearch = () => {
    const filteredForum = forum.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredforums(filteredForum);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    position: "absolute",
    top: 120,
    right: 10,
  };

  return (
    <Fragment>
      <>
        <Button onClick={handleOpen} style={buttonStyle}>
          <SearchTwoToneIcon />
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Search
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="standard"
                    color="secondary"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={handleClose}>
                    <SearchTwoToneIcon />
                  </Button>
                </Grid>
              </Grid>
            </Typography>
          </Box>
        </Modal>
      </>
      {filteredforums.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginTop: 1,
            padding: 4,
          }}
        >
          {filteredforums.map((forums) => (
            <Card
              key={forums._id}
              variant="outlined"
              sx={{
                width: 1200,
                marginBottom: 1,
                minHeight: 135,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 70, height: 70, marginRight: 2, marginLeft: 15 }}
                src={forums.user.avatar.url}
                alt={`Avatar ${forums.post}`}
              >
                {1}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Link to={`/forum/open/${forums._id}`}>
                  <Typography variant="h3" component="div">
                    {forums.title}
                  </Typography>
                </Link>
                <Typography variant="body2">
                  <strong>{forums.user.name}</strong>
                  <br />
                  {forums.post}
                </Typography>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                }}
              >
                <IconButton color="primary" aria-label="Comments">
                  <CommentIcon />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    {forums.comments.length}
                  </Typography>
                </IconButton>
              </div>
            </Card>
          ))}
          {user ? (
            <>
              <IconButton
                color="primary"
                aria-label="Open Modal"
                onClick={handleOpenModal}
                sx={{
                  position: "fixed",
                  bottom: 20,
                  right: 20,
                  backgroundColor: "#23BFA3",
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
                <Typography sx={{ marginLeft: 1 }}>
                  Start a new Discussion
                </Typography>
              </IconButton>
            </>
          ) : (
            <>
              <h1>login first</h1>
            </>
          )}

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
      ) : (
        <Fragment>
          <h1>Create New Discussion</h1>{" "}
          {user ? (
            <IconButton
              color="#5D0664"
              aria-label="Open Modal"
              onClick={handleOpenModal}
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                backgroundColor: "#black",
                "&:hover": {
                  backgroundColor: "#5D0664",
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
              <Typography sx={{ marginLeft: 1 }}>
                Start a new Discussion
              </Typography>
            </IconButton>
          ) : (
            <>
              <h1>LOG IN FIRST</h1>
            </>
          )}
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Forum;
