import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import ProductTable from "./ProductTable";
import UserTable from "./UserTable";
import { Avatar } from "@mui/material";
import { getUser } from "../../utils/helpers";
import { Link } from "react-router-dom";
import ForumTable from "./ForumTable";
import HighDemand from "../Charts/HighDemand";
import TotalSaleUser from "../Charts/TotalSaleUser";
import AverageOrderUser from "../Charts/AverageOrderUser";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const user = getUser();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              height: "69px",
              backgroundColor: "#1F0337",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <h1>DASHBOARD</h1>
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary">
                <Link to="/profile">
                  <Avatar src={user.avatar.url}></Avatar>
                </Link>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundImage: `../public/background.jpg`, // Background image
            backgroundSize: "cover", // Ensure the image covers the entire box
            backgroundPosition: "center", // Center the background image
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item xs={14}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      marginLeft: "120px",
                    }}
                  >
                    <ProductTable />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={14}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      marginLeft: "120px",
                    }}
                  >
                    <UserTable />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={14}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      marginLeft: "120px",
                    }}
                  >
                    <ForumTable />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={7} sx={{ ml: 30 }}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    <AverageOrderUser />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    <HighDemand />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box sx={{ marginLeft: "10px" }}>
                    <TotalSaleUser />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
