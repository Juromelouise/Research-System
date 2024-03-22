import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../Layout/Loader";
import { Button } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/password/forgot`,
        formData,
        config
      );
      console.log(data.error);
      setLoading(false);
      toast("🧅 Token have been sent! Check your email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.error);
      toast(`🧅 ${error.response.data.error}. The page will automatic reload`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      toast("🧅 Email should have laman !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return "";
    }
    const formData = new FormData();
    formData.set("email", email);
    setLoading(true);
    forgotPassword(formData);
  };

  return (
    <Fragment>
      {loading ? <Loader open={loading} /> : <></>}
      <div className="container">
        <div className="row justify-content-center" style={{ color: "white" }}>
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                id="forgot_password_button"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading ? true : false}
              >
                Send Email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
