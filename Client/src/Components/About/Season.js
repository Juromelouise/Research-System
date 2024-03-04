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
      <div style={{ display: "flex", height: "100vh", textAlign: "left"}}>
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

        <div className="container-fluid p-0">
            <div className="row g-0 align-items-center justify-content-center">
              <div className="col-md-6 p-5 mt-lg-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h1 className="display-5 mb-4 text-center">
                  <span className="text-primary">What is the best seasons to plant for onion?</span>
                </h1>
                <p className="mb-4 pb-2">
                  <ul>
                    <li>
                    For best growth and bulb quality, onion requires cooler
                  weather during the early stages of growth and a dry atmosphere
                  with moderately high temperature for bulb development &
                  maturation. Planting can be done as early as October (yellow
                  onions) to as late as January (red onions)
                    </li>
                   
                  </ul>
                </p>
              </div>
              <div className="col-md-6 p-5">
                <img className="img-fluid" src="../onion1.png" alt="Yellow Granex" />
              </div>
            </div>


          <div className="container-fluid p-0">
            <div className="row g-0 align-items-center justify-content-center">
              <div className="col-md-6 p-5 mt-lg-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h1 className="display-5 mb-4 text-center">
                  <span className="text-primary">Yellow onions</span>
                </h1>
                <p className="mb-4 pb-2">
                  <ul>
                    <li>
                      Planting: Can be planted as early as October.
                    </li>
                    <li>
                      Harvest Season: Typically varies, but harvest occurs after around four months of growth.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="col-md-6 p-5">
                <img className="img-fluid" src="../white.jpg" alt="Yellow Granex" />
              </div>
            </div>
          </div>

          <div className="container-fluid p-0">
            <div className="row g-0 align-items-center justify-content-center">
              <div className="col-md-6 p-5 mt-lg-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h1 className="display-5 mb-4 text-center">
                  <span className="text-primary">Red onions</span>
                </h1>
                <p className="mb-4 pb-2">
                  <ul>
                    <li>
                      Planting: Can be planted as late as January.
                    </li>
                    <li>
                      Harvest Season: Varies depending on planting time, usually after around four months of growth.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="col-md-6 p-5">
                <img className="img-fluid" src="../red onion.jpg" alt="Red Onion" />
              </div>
            </div>
          </div>

          <div className="container-fluid p-0">
            <div className="row g-0 align-items-center justify-content-center">
              <div className="col-md-6 p-5 mt-lg-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h1 className="display-5 mb-4 text-center">
                  <span className="text-primary">White onions</span>
                </h1>
                <p className="mb-4 pb-2">
                  <ul>
                    <li>
                      Planting: Best planted during the dry season, starting around December or January.
                    </li>
                    <li>
                      Harvest Season: Typically starts in the second week of January until February, after around four months of growth.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="col-md-6 p-5">
                <img className="img-fluid" src="../shallots1.jpg" alt="Shallots (Multiplier Onion)" />
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