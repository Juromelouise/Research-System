import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Season = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
           <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "20%",
          marginRight: "10px",
          position: "sticky",
          top: 0,
          height: "100vh", 
          overflowY: "auto",
        }}
      >
        {LeftItemList}
      </div>
      <div style={{ flex: "1", textAlign: "center", overflowY: "auto" }}>
          <div className="hero"></div>
          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header bg-white p-0">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-6 p-5 mt-lg-5">
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    "What is the best seasons to plant for onion?"{" "}
                  </span>
                </h1>
                <p className="animated fadeIn mb-4 pb-2 ">
                  For best growth and bulb quality, onion requires cooler
                  weather during the early stages of growth and a dry atmosphere
                  with moderately high temperature for bulb development &
                  maturation. Planting can be done as early as October (yellow
                  onions) to as late as January (red onions).
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../onion1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <List component="nav">
            <Divider sx={{ my: 1 }} />
          </List>
        </div>
      </div>
    </div>
  );
};

export default Season;
