import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { mainListItems } from "./ListItems";
import axios from "axios";
import { getToken } from "../../utils/helpers";

export default function UserTable() {
  const [user, setUsers] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const getUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/all/users`,
        config
      );
      console.log(data.user);
      setUsers(data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/admin/user/${id}`,
        config
      );
      const updatedUsers = user.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const updateRoleSeller = async (id) => {
    try{
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/role/seller/${id}`)
      setUsers(data.users)
    }catch(error){
      console.log(error)
    }
  };

  const updateRoleFarmer = async (id) => {
    try{
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/role/farmer/${id}`)
      setUsers(data.users)
    }catch(error){
      console.log(error)
    }
  };

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Profile Img.",
        field: "avatar",
        sort: "asc",
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: user.map((row) => ({
      name: row.name,
      avatar: row.avatar && (
        <img
          src={row.avatar.url}
          alt={row.avatar.public_id}
          style={{ width: "100px", height: "100px" }}
        />
      ),
      role: row.role,
      email: row.email,
      action: (
        <Fragment>
          <Link
            onClick={() => updateRoleSeller(row._id)}
            style={{ textDecoration: "none" }}
          >
            <button className="edit-btn">Seller</button>
          </Link>
          <Link
            onClick={() => updateRoleFarmer(row._id)}
            style={{ textDecoration: "none" }}
          >
            <button className="edit-btn">Farmer</button>
          </Link>
          <Link onClick={() => deleteUserHandler(row._id)}>
            <button className="delete-btn">Delete</button>
          </Link>
        </Fragment>
      ),
    })),
  };

  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <List component="nav">
          {/* {mainListItems} */}
          <Divider sx={{ my: 1 }} />
        </List>
        {/* Main content */}
        <div className="col-12 col-md-10">
          <p className="star">ALL USER</p>

          <div className="custom-mdb-table">
            <MDBDataTable
              data={data}
              searching={false}
              bordered
              striped
              hover
            />
          </div>
          <Button
            component={Link}
            to="/admin/user/new"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              color: "white",
              backgroundColor: "black",
              transition: "color 0.3s, background-color 0.3s",
              margin: "20px 30px",
              padding: "15px",
              "&:hover": {
                color: "white", // Text color on hover
                backgroundColor: "gray", // Background color on hover
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Add User
          </Button>
        </div>
      </div>
    </Fragment>
  );
}