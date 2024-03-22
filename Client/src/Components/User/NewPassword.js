import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@mui/material";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let { token } = useParams();

  const resetPassword = async (token, passwords) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/password/reset/${token}`,
        passwords,
        config
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    if (error) {
      toast(`🧅 ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (success) {
      toast(`🧅 ${success}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/signin");
    }
  }, [error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    resetPassword(token, formData);
  };

  return (
    <Fragment>
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100" style={{color: "white"}}>
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">New Password</h1>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                id="new_password_button"
                type="submit"
                sx={{mt: 2}}
                fullWidth
                color="primary"
                variant="contained"
              >
                Set Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
