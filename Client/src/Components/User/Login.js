import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../utils/helpers";
import { getUser } from "../../utils/helpers";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get("redirect");
  console.log(redirect);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/login`,
        { email, password },
        config
      );
      console.log(data);
      alert("Login");
      authenticate(data, () => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getUser() && redirect === "checkout") {
      navigate(`/${redirect}`);
    } else {
      navigate("/signin");
    }
  }, [navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src="user.png" className="brand_logo" alt="Logo" />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="email"
                  name=""
                  className="form-control input_user"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name=""
                  className="form-control input_pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlInline"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" className="btn login_btn">
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              <Link to="/signup" variant="body2" style={{ color: "black" }}>
                Don't have an account?{" "}
                <a href="#" className="ml-2" style={{ color: "black" }}>
                  Sign Up
                </a>
              </Link>
            </div>
            <div className="d-flex justify-content-center links">
              <a href="#" style={{ color: "black" }}>
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
