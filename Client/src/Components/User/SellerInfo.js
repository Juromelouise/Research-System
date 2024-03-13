import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const SellerInfo = () => {
  const [seller, setSeller] = useState([]);

  const getSeller = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/get/seller`
      );
      setSeller(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSeller();
  }, []);
  return (
    <MDBTable align="middle">
  <MDBTableHead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Location</th>
      <th scope="col">Position</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody>
    {seller.map((sellers) => (
      <tr>
        <td style={{ verticalAlign: 'middle' }}>
          <div className="d-flex align-items-center">
            <img
              src={sellers?.avatar.url}
              alt={sellers.avatar.public_id}
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            <div className="ms-1" style={{ textAlign: "center" }}>
              <p className="fw-bold mb-1">{sellers.name}</p>
              <p className="text-muted mb-0">{sellers.email}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{sellers.phone}</p>
        </td>
        <td>
          <p className="fw-normal mb-1">
            {sellers.baranggay}, {sellers.city}
          </p>
        </td>
        <td>{sellers.role}</td>
      </tr>
    ))}
  </MDBTableBody>
</MDBTable>

  );
};

export default SellerInfo;
