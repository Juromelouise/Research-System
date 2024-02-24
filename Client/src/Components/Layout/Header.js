import React from "react";
import { getUser, logout } from "../../utils/helpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

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
        {/* Added alt attribute */}
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
            <li className="nav-item dropdown">
              <a
                href="#fff"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                style={{ color: "#fff" }}
              >
                About
              </a>
              <ul className="dropdown-menu">
                {aboutDropdownItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      to={`/about/${item.toLowerCase()}`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/forum" className="nav-link" style={{ color: "#fff" }}>
                Forums and Discussions
              </Link>
            </li>
            {user.role === "farmer" && (
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
            {user.role === "seller" && (
              <li className="nav-item">
                <Link
                  to="/farmer/info"
                  className="nav-link"
                  style={{ color: "#fff" }}
                >
                  Farmers
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav>
        {user ? (
          <>
            <div className="dropdown">
              {" "}
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                src={user.avatar && user.avatar.url}
                alt={user && user.name}
                className="dropdown-trigger"
              />
              <div className="dropdown-content">
                {" "}
                <Link to="/profile">
                  <button className="dropdown-item">Profile</button>
                </Link>
                <Link to="/dashboard">
                  <button className="dropdown-item">Dashboard</button>
                </Link>
                <button className="dropdown-item" onClick={logoutUser}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <nav style={{ position: "relative" }}>
            {isDropdownOpen && (
              <div style={{ ...dropdownStyle, ...{ display: "block" } }}>
                {" "}
                <Link
                  to="/signin"
                  style={dropdownItemStyle}
                  onClick={toggleDropdown}
                >
                  Sign In
                </Link>
                <hr className="dropdown-divider" />
                <Link
                  to="/signup"
                  style={dropdownItemStyle}
                  onClick={toggleDropdown}
                >
                  Sign Up
                </Link>
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
