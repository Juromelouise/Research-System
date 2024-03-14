import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, createRoutesFromChildren, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { Loader } from "../Layout/Loader";

const defaultTheme = createTheme();

export default function Register() {
  let navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [attachmentPreview, setAttachementPreview] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    baranggay: "",
    city: "",
    phone: "",
    password: "",
    role: "",
    attachement: "",
    description: "",
    season: "",
    fertilizer: "",
    type: "",
  });

  const {
    name,
    email,
    phone,
    password,
    baranggay,
    city,
    role,
    description,
    season,
    fertilizer,
    type,
  } = user;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("baranggay", baranggay);
    formData.set("city", city);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("avatar", avatar);
    console.log(Array(...attachment));
    Array(...attachment).forEach((attachements) => {
      formData.append("attachment", attachements);
    });

    formData.set("role", role);
    formData.set("description", description);
    formData.set("season", season);
    formData.set("fertilizer", fertilizer);
    formData.set("type", type);
    setLoading(true);
    register(formData);
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    if (e.target.name === "attachment") {
      const reader = new FileReader();
      setAttachment(e.target.files);

      // console.log(e.target.files)
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAttachementPreview(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  // console.log(attachment)

  const register = async (userData) => {
    for (const pair of userData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (user.role === "buyer") {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          `${process.env.REACT_APP_API}/api/v1/register`,
          userData,
          config
        );
        setIsAuthenticated(true);
        alert("User Created Succesfully");
        setLoading(false);
        navigate("/signin");
      } else {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          `${process.env.REACT_APP_API}/api/v1/register/supplier/seller`,
          userData,
          config
        );
        setIsAuthenticated(true);
        alert("User Created Succesfully");
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? <Loader open={loading} /> : <></>}
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#406EAB" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {avatarPreview ? (
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              src={avatarPreview}
            ></Avatar>
          ) : (
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          )}

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>
                  User:
                </InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={role}
                  onChange={onChange}
                  fullWidth
                >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="supplier">Supplier/Farmer</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Baranggay"
                  name="baranggay"
                  value={baranggay}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="City"
                  name="city"
                  value={city}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
              </Grid>
              {user.role === "supplier" ? (
                <>
                  {" "}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="description"
                      id="description"
                      multiline
                      rows={4}
                      label="Description"
                      value={description}
                      onChange={onChange}
                    />
                  </Grid>
                  <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>
                    Season:
                  </InputLabel>
                  <Select
                    label="season"
                    name="season"
                    value={season}
                    onChange={onChange}
                    fullWidth
                  >
                    <MenuItem value="Rainy Season">Rainy Season</MenuItem>
                    <MenuItem value="Dry Season">Dry Season</MenuItem>
                  </Select>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="fertilizer"
                      label="Fertilizer"
                      id="fertilizer"
                      value={fertilizer}
                      onChange={onChange}
                    />
                  </Grid>
                  <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>
                    Onion Type:
                  </InputLabel>
                  <Select
                    label="type"
                    name="type"
                    value={type}
                    onChange={onChange}
                    fullWidth
                  >
                    <MenuItem value="Red Onion">Red Onion</MenuItem>
                    <MenuItem value="White Onion">White Onion</MenuItem>
                    <MenuItem value="Multiplier Onion">Multiplier Onion</MenuItem>
                    <MenuItem value="Native Onion">Native Onion</MenuItem>
                  </Select>
                </>
              ) : (
                <></>
              )}
              {user.role === "supplier" || user.role === "seller" ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="attachment"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Input Valid ID"
                      type="file"
                      id="attachment"
                      inputProps={{
                        multiple: true,
                      }}
                      onChange={onChange}
                    />{" "}
                  </Grid>
                </>
              ) : (
                <></>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="avatar"
                  type="file"
                  id="avatar"
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2" style={{ color: "black" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
