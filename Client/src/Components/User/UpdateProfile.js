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
import { getUser, getToken, authenticate } from "../../utils/helpers";

export default function UpdateProfile() {
  const navigate = useNavigate();
  let { id } = useParams();
  const user = getUser();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);

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
      authenticate(data, () => navigate("/profile"));
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
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Update Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
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
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
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
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Avatar
                </InputLabel>
              </Grid>
              <Grid>
                <Button>
                  <Grid item xs={12} sm={11}>
                    <TextField
                      required
                      fullWidth
                      name="avatar"
                      type="file"
                      id="avatar"
                      onChange={onChange}
                    />
                  </Grid>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={15}>
                <Button
                  variant="contained"
                  sx={{ color: "#ff781f" }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
