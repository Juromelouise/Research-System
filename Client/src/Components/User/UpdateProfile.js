import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken, logout } from "../../utils/helpers";
import { Avatar } from "@mui/material";

export default function UpdateProfile() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    updateUser(formData);
  };

  const getUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/profile`,
        config
      );
      setName(data.user.name);
      setEmail(data.user.email);
      setAvatarPreview(data.user.avatar.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser(id);
  }, []);

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
      logout(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/user/update`,
        formData,
        config
      );
      alert(
        "To apply the changes in your updated profile, We logout your account. Please sign in again"
      );
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <hr/>
      <Paper elevation={10} sx={{ marginRight: "15%", backgroundColor: '#1f0337' , marginLeft: "15%", }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 1, backgroundColor: '#1f0337' , fontFamily: "Times New Roman", color: "white" }}>
            <h1>UPDATE PROFILE</h1>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white"
                  }}
                >
                  Name
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
  <TextField
    required
    id="name"
    name="name"
    label="Name"
    fullWidth
    size="small"
    autoComplete="off"
    variant="outlined"
    value={name}
    onChange={(e) => setName(e.target.value)}
    inputProps={{ style: { color: 'white' } }}
  />
</Grid>
              <Grid item xs={12} sm={2} color>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white"
                  }}
                >
                  Email
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white"
                  }}
                >
                  Avatar
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="avatar"
                  type="file"
                  id="avatar"
                  onChange={onChange}
                  inputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Avatar src={avatarPreview} sx={{ width: 56, height: 56 }} />
              </Grid>
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  sx={{ color: "white" }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
