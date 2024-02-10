import { borderRight } from "@mui/system";
import React from "react";
import { getUser, logout } from "../../utils/helpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { Avatar, Button } from "@mui/material";

const Header = () => {
  const [user, setUser] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
      setUser("");
      logout(() => navigate("/homepage"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "0rem",
    textAlign: "center",
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

  const Listbox = styled("ul")(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
    };
    z-index: 1;
    `
  );

  const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
    `
  );

  const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
    `
  );

  return (
    <header style={headerStyle}>
      <h3>What the Hell is onion?</h3>
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
              href="/contact"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <nav>
        {user ? (
          <div>
            <Avatar
              alt="Remy Sharp"
              src={user.avatar && user.avatar.url}
              style={{ marginRight: "8px" }}
            />
            <button style={loginButtonStyle} onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <nav style={{ position: "relative" }}>
            {isDropdownOpen && (
              <div style={dropdownStyle}>
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
