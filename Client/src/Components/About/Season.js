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
       <div style={{ display: "flex", height: "100vh", fontFamily: "Times New Roman", color: "white" }}>
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

        <div className="container-fluid header #1F0337">
        <img src="../season.jpg" className="img-fluid" alt="Wild Landscape" style={{maxWidth: '100%', height: '50%'}} width={1300} height={300} />
<hr/>
        <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    What is the best seasons to plant for onion?{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                For best growth and bulb quality, onion requires cooler weather during the early stages of growth and a dry atmosphere with moderately high temperature for bulb development & maturation. Planting can be done as early as October (yellow onions) to as late as January (red onions)
                </li>
                </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../farming.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />



          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    YELLOW ONIONS{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
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
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../yellowonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    RED ONIONS{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
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
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../redonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    WHITE ONION{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
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
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../whiteonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col"><h1>SOME RELATED VIDEO</h1></th>
              </tr>
            </thead>
          </table>
          <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/NEzfABuX5fI" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                            <p className="citation" style={{color: 'white'}}>Copyright: YouTube. (n.d.). Www.youtube.com. Retrieved March 18, 2024, from https://www.youtube.com/embed/NEzfABuX5fI </p>
                      <p>from https://www.youtube.com/embed/SVkMIOPe8hA</p>
        </div>
      <hr/>
          
          <List component="nav">
            <Divider sx={{ my: 1 }} />
          </List>
        </div>
      </div>
    </div>
  );
};

export default Season;