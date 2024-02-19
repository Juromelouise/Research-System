import React from "react";
import { getUser, logout } from "../../utils/helpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const Header = () => {
  const user = getUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
      logout(() => navigate("/homepage"));
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
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem", // Increased padding for better spacing
    textAlign: "center",
  };

  const logoStyle = {
    width: "50px", // Adjust the width as needed
    marginRight: "10px", // Add some margin for spacing
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
      <img src="../logo.png" alt="Logo" style={logoStyle} />{" "}
      {/* Added alt attribute */}
      <h3>Onion Supply Chain</h3>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </a>
          </li>
          <li style={navItemStyle}>
            <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>
              About
            </a>
          </li>
          <li style={navItemStyle}>
            <a
              href="/farmer/info"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Farmers
            </a>
          </li>
          <li style={navItemStyle}>
            <a
              href="/seller/info"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Sellers
            </a>
          </li>
        </ul>
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
                <button className="dropdown-item" onClick={logoutUser}>
                  Logout
                </button>
                <button>
                  <Link to="/dashboard" className="dropdown-item">
                    {" "}
                    Dashboard
                  </Link>
                </button>
              </div>
            </div>
          </>
        ) : (
          <nav style={{ position: "relative" }}>
            {isDropdownOpen && (
              <div style={{ ...dropdownStyle, ...{ display: "block" } }}>
                {" "}
                {/* Adjusted style object */}
                <Link to="/signin" style={dropdownItemStyle}>
                  Sign In
                </Link>
                <Link to="/signup" style={dropdownItemStyle}>
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
