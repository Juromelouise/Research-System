
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import '../../index.css';

const Profile = () => {
  const [user, setUser] = useState("");

  const getProfile = async () => {
    const config = {
      headers: {
       Authorization: `Bearer ${getToken()}`,
      },
      // withCredentials: true,
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/profile`,
        config
      );
      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
   
      <div className="container py-5">
        
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center"style={{ color: '#1f0337' }}>
              <figure className="avatar avatar-profile">
              <img
                className="rounded-circle img-fluid" style={{ width: "290px", height: "290px"}}
                src={user.avatar?.url}
                alt={user.name}
                
              />
            </figure>
                <h5 className="my-1">{user.name}</h5>
                <p className="text-muted mb-1">User</p>
                <p className="text-muted mb-4">Resident of Taguig City</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
              <div className="col-md-6" style={{ textAlign: "center" }}>
                    <h2 style={{ color: "black", fontSize: "36px" }}><strong>Personal Information</strong></h2>
                  </div>
                <div className="row">
                  <hr/>
                  <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}><strong>NAME:</strong></p>
                  </div>
                  <div className="col-sm-9">
                  <p>{user.name}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0" style={{ textAlign: "justify" }}><strong>BARANGAY:</strong></p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{user.baranggay}</p>
                          </div>
                        </div>
                        <hr/>

                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0" style={{ textAlign: "justify" }}><strong>CITY:</strong></p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{user.city}</p>
                          </div>
                        </div>
                        <hr/>


                <div className="row">
                  <div className="col-sm-3">
                  <p className="mb-0" style={{ textAlign: "justify" }}><strong>EMAIL:</strong></p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0" style={{ textAlign: "justify" }}><strong>PHONE NUMBER:</strong></p>
                  </div>
                  <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.phone}</p>
                  </div>
                </div>
                <hr />
                
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0" style={{ textAlign: "justify" }}><strong>JOIN ON:</strong></p>
                  </div>
                  <div className="col-sm-9">
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/update/profile/${user._id}`}>
              <center>
                <button type="button" class="btn btn-purple" data-mdb-ripple-init><strong>Update</strong></button>
             </center>
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;