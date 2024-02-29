import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

const FarmerInfo = () => {
  const [farmer, setFarmer] = useState([]);


  const getFarmer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/get/farmer`
      );
      setFarmer(data.users);
      console.log(data.users);

    } catch (error) {
      console.log(error);
    }
  };;
  useEffect(() => {
    getFarmer();
  }, []);
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Location</th>
          <th scope="col">Position</th>
          <th scope="col">Check Product</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {farmer.map((farmers) => (
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={farmers?.avatar.url}
                  alt={farmers.avatar.public_id}
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{farmers.name}</p>
                  <p className="text-muted mb-0">{farmers.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{farmers.phone}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{farmers.location}</p>
            </td>
            <td>{farmers.role}</td>
            <td><Link to={`/single/user/product?fid=${farmers._id}`}><Button>Check</Button></Link></td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default FarmerInfo;
