import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

import {
  MDBCarousel,
  MDBCarouselItem,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBNavbar,
  MDBRipple,
  MDBIcon,
} from "mdb-react-ui-kit";


const About = () => {
  const [open, setOpen] = useState(true);

  return (
    
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "20%",
          marginRight: "10px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          marginLeft: "5px",
          color : "white"
        }}
      >
        {LeftItemList}
      </div>
      
      <div style={{ flex: "1", textAlign: "left", overflowY: "auto", color: "white", fontFamily: "Times New Roman" }}>
        <h1 style={{ fontSize: "40px" }}>ABOUT US</h1>
        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
        <MDBModalBody style={{ color: "white" }}>
          <p>
            <div className="row">
              <div className="col-md-5 gx-3">
                <MDBRipple
                  className="bg-image hover-overlay shadow-1-strong rounded"
                  rippleTag="div"
                  rippleColor="primary"
                >
                  <img src="../group.jpg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    ></div>
                  </a>
                </MDBRipple>
              </div>
              <div className="col-md-6" style={{ textAlign: "left" }}>
                <h2 style={{ color: "white", fontSize: "36px" }}>Optimizing Onion Supply Chain: A Web-Based Platform for Improved Communication and Transparency</h2>
                <p style={{ color: "white", fontSize: "24px" }}>
                  <span> </span>The researchers will provide a solution by creating a web-based platform for onion
                  supply chains that will help to communicate with local farmers and local sellers to gain buyers.
                  This web-based platform will indicate information on all processes of growing onions, some
                  alternative solutions for farmers' unexpected problems, strategies for local sellers to choose
                  good quality onions, and the locations of local farmers and local sellers for transacting their
                  businesses. By using this web-based platform, buyers will be able to know why there is an
                  unpredictable increasing price of onions and be able to learn the problems of local farmers and
                  local sellers they face.
                </p>
                <hr />
                <p style={{ color: "white", fontSize: "24px" }}>
                  {" "}
                  In this context, to enhance information efficiency, improve businesses, and raise
                  awareness about the sudden increase in onion price, with the use of a web-based platform that
                  the researchers provide. It will improve communication with transparency between the onion
                  supply chain.
                </p>

                <MDBBtn outline rounded>
                  Learn More <MDBIcon fas icon="book-open" />
                </MDBBtn>
              </div>
            </div>
          </p>

        </MDBModalBody>



        <img src="../info.png" className="w-100" />
      </div>
    </div>
  );
};

export default About;
