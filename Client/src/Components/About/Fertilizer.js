import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Fertilizer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
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
                    "Organic Fertilizer"{" "}
                  </span>
                </h1>
                <p className="animated fadeIn mb-4 pb-2">
                Organic onion grow without the use of artificial pesticides or herbicides. Instead, 
                they are grown naturally through crop rotation, composting and 
                the use of helpful insects to combat pests. Both the environment 
                and human health are protected in this process.
                </p>
              </div>
              <div className="col-md-5 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../org.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero"></div>
          <div className="glide" id="glide_2">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides"></ul>
              <div className="center">
                <div className="right">
                  <div className="container-fluid header bg-white p-0">
                    <div className="row g-0 align-items-left flex-column-reverse flex-md-row">
                      <div className="col-md-6 p-5 mt-lg-5">
                        <div className="col-md-10 animated fadeIn">
                          <div className="owl-carousel header-carousel">
                            <div className="left">
                              <img
                                className="img-fluid"
                                src="../fishem.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 p-5 mt-lg-5 animated fadeIn">
                        <div>
                          <h1 className="display-5 mb-4">
                            <span className="text-primary align-items-left">
                              "Fish Emulsion Fertilizer"{" "}
                            </span>
                          </h1>
                          <p className="mb-4 pb-2">
                          Fish fertilizer contains high levels of essential nutrients like nitrogen, phosphorus, potassium, 
                          calcium, magnesium, and sulfur,all important components required by onion plants for growth.
                          Fish fertilizers are excellent for growing onions naturally without overwhelming them with synthetic 
                          chemicals or burning roots due to imbalanced pH levels in conventional types often encountered issues
                           with commercial-grade products. Find yourself pleased at how much healthier your bulbs will be with this eco-friendly option!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
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
                    <span className="text-primary">"Compost " </span>
                  </h1>
                  <p className="animated fadeIn mb-4 pb-2">
                    Compost is a rich source of organic matter and nutrients
                    improving soil structure,drainage, and fertilizer.
                    You can make your own compost from kitchen scraps or 
                    yard waste.
                  </p>
                </div>
                <div className="col-md-5 animated fadeIn">
                  <div className="owl-carousel header-carousel">
                    <div className="right">
                      <img className="img-fluid" src="../fertilizer.jpeg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero"></div>
            <div className="glide" id="glide_2">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides"></ul>
                <div className="center">
                  <div className="right">
                    <div className="container-fluid header bg-white p-0">
                      <div className="row g-0 align-items-left flex-column-reverse flex-md-row">
                        <div className="col-md-6 p-5 mt-lg-5">
                          <div className="col-md-10 animated fadeIn">
                            <div className="owl-carousel header-carousel">
                              <div className="left">
                                <img
                                  className="img-fluid"
                                  src="../faa.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 p-5 mt-lg-5 animated fadeIn">
                          <div>
                            <h1 className="display-5 mb-4">
                              <span className="text-primary align-items-left">
                                "Fish Amino Acid "{" "}
                              </span>
                            </h1>
                            <p className="mb-4 pb-2">
                            Fish entrails are used to make fish amino acids (FAA), a natural fertilizer. 
                            They give plants easily accessible nitrogen and
                            essential amino acids, which enhance growth while improving the condition of the soil it can 
                            be used as a foliar spray or soil drench 
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
  );
};

export default Fertilizer;
