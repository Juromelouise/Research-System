import React from "react";
import { getUser, logout } from "../../utils/helpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
const Header = () => {
  const user = getUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const aboutDropdownItems = [
    "Season",
    "Onion Types",
    "Fertilizers",
    "Production",
    "Challenges",
  ];
  const navigate = useNavigate();

  const logoutUser = async () => {
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

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F0337",
    color: "#fff",
    padding: "0rem",
    textAlign: "center",
  };

  const logoStyle = {
    width: "100px",
    marginRight: "10px",
  };

  const navStyle = {
    listStyle: "none",
    padding: 0,
    display: "flex",
    justifyContent: "center",
  };

  const navItemStyle = {
    margin: "0 1rem",
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

  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#99CCF3",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E6",
    700: "#0059B3",
    800: "#004C99",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/">
          <img src="../logo.png" alt="Logo" style={logoStyle} />{" "}
        </Link>
        <h5>ONISTEM</h5>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={navStyle}>
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "#fff" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" style={{ color: "#fff" }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/forum" className="nav-link" style={{ color: "#fff" }}>
                Forums and Discussions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link" style={{ color: "#fff" }}>
                Cart
              </Link>
            </li>
            {user.role === "supplier" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/seller/info"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Sellers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/product/create"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Post Product
                  </Link>
                </li>
              </>
            )}
            {user.role === "buyer" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/browse/product"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Product
                  </Link>
                </li>
              
              </>
            )}
            {user.role === "seller" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/farmer/info"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Farmers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/product/create"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Post Product
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <nav>
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
<<<<<<< HEAD
                  <Link to="/single/seller  /product">
                    <button className="dropdown-item">Information</button>
=======
                  <Link to="/single/seller/product">
                    <button className="dropdown-item">Product List</button>
>>>>>>> a97f84857af900b1d3f26d79a62e5dc379a58738
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
      </nav>
    </header>
  );
};

export default Header;
