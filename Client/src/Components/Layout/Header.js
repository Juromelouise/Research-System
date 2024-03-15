// import React from "react";
// import { getUser, logout } from "../../utils/helpers";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Avatar, Button } from "@mui/material";
// const Header = () => {
//   const user = getUser();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const aboutDropdownItems = [
//     "Season",
//     "Onion Types",
//     "Fertilizers",
//     "Production",
//     "Challenges",
//   ];
//   const navigate = useNavigate();

//   const logoutUser = async () => {
//     try {
//       await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
//       alert("User Logout");
//       logout(() => navigate("/"));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#1F0337",
//     color: "#fff",
//     padding: "0rem",
//     textAlign: "center",
//   };

//   const logoStyle = {
//     width: "100px",
//     marginRight: "10px",
//   };

//   const navStyle = {
//     listStyle: "none",
//     padding: 0,
//     display: "flex",
//     justifyContent: "center",
//   };

//   const navItemStyle = {
//     margin: "0 1rem",
//   };

//   const loginButtonStyle = {
//     padding: "0.5rem 1rem",
//     backgroundColor: "#61dafb",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   };

//   const dropdownStyle = {
//     display: isDropdownOpen ? "block" : "none",
//     position: "absolute",
//     top: "100%",
//     right: 0,
//     backgroundColor: "#fff",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     borderRadius: "5px",
//     zIndex: 1,
//   };

//   const dropdownItemStyle = {
//     padding: "0.5rem 1rem",
//     textDecoration: "none",
//     color: "#333",
//     display: "block",
//   };

//   const blue = {
//     50: "#F0F7FF",
//     100: "#C2E0FF",
//     200: "#99CCF3",
//     300: "#66B2FF",
//     400: "#3399FF",
//     500: "#007FFF",
//     600: "#0072E6",
//     700: "#0059B3",
//     800: "#004C99",
//     900: "#003A75",
//   };

//   const grey = {
//     50: "#F3F6F9",
//     100: "#E5EAF2",
//     200: "#DAE2ED",
//     300: "#C7D0DD",
//     400: "#B0B8C4",
//     500: "#9DA8B7",
//     600: "#6B7A90",
//     700: "#434D5B",
//     800: "#303740",
//     900: "#1C2025",
//   };

//   return (
//     <header style={headerStyle}>
//       <div>
//         <Link to="/">
//           <img src="../logo.png" alt="Logo" style={logoStyle} />{" "}
//         </Link>
//         <h5>ONISTEM</h5>
//       </div>
//       <nav className="navbar navbar-expand-lg navbar-dark">
//         <div className="container">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={navStyle}>
//             <li className="nav-item">
//               <Link to="/" className="nav-link" style={{ color: "#fff" }}>
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/about" className="nav-link" style={{ color: "#fff" }}>
//                 About
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/forum" className="nav-link" style={{ color: "#fff" }}>
//                 Forums and Discussions
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/cart" className="nav-link" style={{ color: "#fff" }}>
//                 Cart
//               </Link>
//             </li>
//             {user.role === "supplier" && (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     to="/seller/info"
//                     className="nav-link"
//                     style={{ color: "#fff" }}
//                   >
//                     Sellers
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     to="/product/create"
//                     className="nav-link"
//                     style={{ color: "#fff" }}
//                   >
//                     Post Product
//                   </Link>
//                 </li>
//               </>
//             )}
//             {user.role === "buyer" && (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     to="/browse/product"
//                     className="nav-link"
//                     style={{ color: "#fff" }}
//                   >
//                     Product
//                   </Link>
//                 </li>

//               </>
//             )}
//             {user.role === "seller" && (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     to="/farmer/info"
//                     className="nav-link"
//                     style={{ color: "#fff" }}
//                   >
//                     Farmers
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     to="/product/create"
//                     className="nav-link"
//                     style={{ color: "#fff" }}
//                   >
//                     Post Product
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
//       <nav>
//         {user ? (
//           <>
//             <div className="dropdown">
//               {" "}
//               <Button className="dropdown-trigger">
//                 <Avatar
//                   sx={{ bgcolor: "secondary.main" }}
//                   src={user.avatar && user.avatar.url}
//                   alt={user && user.name}
//                 />
//               </Button>
//               <div className="dropdown-content">
//                 {" "}
//                 <Link to="/profile">
//                   <button className="dropdown-item">Profile</button>
//                 </Link>
//                 {user.role === "supplier" ? (
//                   <Link to="/single/user/product">
//                     <button className="dropdown-item">Product List</button>
//                   </Link>
//                 ) : (
//                   <></>
//                 )}
//                 {user.role === "seller" ? (
//                   <Link to="/single/seller/product">
//                     <button className="dropdown-item">Product List</button>
//                   </Link>
//                 ) : (
//                   <></>
//                 )}
//                 {user.role === "admin" || user.role === "Admin" ? (
//                   <Link to="/dashboard">
//                     <button className="dropdown-item">Dashboard</button>
//                   </Link>
//                 ) : (
//                   <></>
//                 )}
//                 <Link>
//                   <button className="dropdown-item" onClick={logoutUser}>
//                     Logout
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </>
//         ) : (
//           <nav style={{ position: "relative" }}>
//             {isDropdownOpen && (
//               <div
//                 style={{
//                   ...dropdownStyle,
//                   ...{ display: "block", backgroundColor: "#406EAB" },
//                 }}
//               >
//                 <a
//                   href="/signin"
//                   className="dropdown-item"
//                   style={dropdownItemStyle}
//                   onClick={toggleDropdown}
//                 >
//                   Sign In
//                 </a>
//                 <hr className="dropdown-divider" />
//                 <a
//                   href="/signup"
//                   className="dropdown-item"
//                   style={dropdownItemStyle}
//                   onClick={toggleDropdown}
//                 >
//                   Sign Up
//                 </a>
//               </div>
//             )}
//             <div style={{ position: "relative", display: "inline-block" }}>
//               <button onClick={toggleDropdown} style={loginButtonStyle}>
//                 Login
//               </button>
//             </div>
//           </nav>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getUser, logout } from "../../utils/helpers";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const logoutUser = async () => {
    // console.log('aasdasd')
    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
      alert("User Logout");
      logout(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const loginButtonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#61dafb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const dropdownStyle = {
    display: isDropdownOpen ? "block" : "none",
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    zIndex: 1,
  };

  const dropdownItemStyle = {
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: "#333",
    display: "block",
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="../onion-icon.webp" alt="Logo" style={{ width: '40px', height: '40px' }} sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ONISTEM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to="/" >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/about" >
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/forum" >
                <Typography textAlign="center">Discussions</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/cart" >
                <Typography textAlign="center">Cart</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ONISTEM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user.role === "supplier" ? (
              <>
                <Button component={Link} to="/seller/info" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Sellers
                </Button>
                <Button component={Link} to="/forum" sx={{ my: 2, color: 'white', display: 'block' }}>
                Discussions
               </Button>
                <Button component={Link} to="/product/create" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Create Product
                </Button>
                <Button component={Link} to="/cart" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Cart
                </Button>
              </>
            ) : user.role === "buyer" ? (
              <>
                <Button component={Link} to="/browse/product" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Products
                </Button>
                <Button component={Link} to="/forum" sx={{ my: 2, color: 'white', display: 'block' }}>
                Discussions
              </Button>
              <Button component={Link} to="/product/create" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Create Product
                </Button>
                <Button component={Link} to="/cart" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Cart
                </Button>
              </>
            ) : user.role === "seller" ? (
              <>
                <Button component={Link} to="/farmer/info" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Farmers
                </Button>
                <Button component={Link} to="/product/create" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Create Product
                </Button>
                <Button component={Link} to="/forum" sx={{ my: 2, color: 'white', display: 'block' }}>
                Discussions
              </Button>
                <Button component={Link} to="/cart" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Cart
                </Button>
              </>
            ) : <>
              <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>
                Home
              </Button>
              <Button component={Link} to="/about" sx={{ my: 2, color: 'white', display: 'block' }}>
                About
              </Button>
              <Button component={Link} to="/forum" sx={{ my: 2, color: 'white', display: 'block' }}>
                Discussions
              </Button>
              <Button component={Link} to="/cart" sx={{ my: 2, color: 'white', display: 'block' }}>
                Cart
              </Button>
            </>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <div className="dropdown">
                  {" "}
                  <Button className="dropdown-trigger">
                    <Avatar
                      sx={{ bgcolor: "secondary.main" }}
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                    />
                  </Button>
                  <div className="dropdown-content">
                    {" "}
                    <Link to="/profile">
                      <button className="dropdown-item">Profile</button>
                    </Link>
                    {user.role === "supplier" ? (
                      <Link to="/single/user/product">
                        <button className="dropdown-item">Product List</button>
                      </Link>
                    ) : (
                      <></>
                    )}
                    {user.role === "seller" ? (
                      <Link to="/single/user/product">
                        <button className="dropdown-item">Product List</button>
                      </Link>
                    ) : (
                      <></>
                    )}
                    {user.role === "admin" || user.role === "Admin" ? (
                      <Link to="/dashboard">
                        <button className="dropdown-item">Dashboard</button>
                      </Link>
                    ) : (
                      <></>
                    )}
                    <Link>
                      <button className="dropdown-item" onClick={logoutUser}>
                        Logout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <nav style={{ position: "relative" }}>
                {isDropdownOpen && (
                  <div
                    style={{
                      ...dropdownStyle,
                      ...{ display: "block", backgroundColor: "#406EAB" },
                    }}
                  >
                    <a
                      href="/signin"
                      className="dropdown-item"
                      style={dropdownItemStyle}
                      onClick={toggleDropdown}
                    >
                      Sign In
                    </a>
                    <hr className="dropdown-divider" />
                    <a
                      href="/signup"
                      className="dropdown-item"
                      style={dropdownItemStyle}
                      onClick={toggleDropdown}
                    >
                      Sign Up
                    </a>
                  </div>
                )}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button onClick={toggleDropdown} style={loginButtonStyle}>
                    Login
                  </button>
                </div>
              </nav>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

export default ResponsiveAppBar;
