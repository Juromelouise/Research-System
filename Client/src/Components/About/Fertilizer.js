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
                Organic fertilizers are beneficial for plant growth as they improve soil health, 
                promote microbial activity, and reduce environmental impact compared to synthetic fertilizers.
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
                          calcium, magnesium, and sulfur— all important components required by onion plants for growth.
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
                    <span className="text-primary">"Yellow Granex " </span>
                  </h1>
                  <p className="animated fadeIn mb-4 pb-2">
                    The yellow varieties grown for the traditional market are
                    either the granex (flat) or the grano (round) type, short
                    day onions. White onions are characterized by their milder,
                    sweeter taste and tender texture, making them suitable for
                    raw applications like salads, salsas, and sandwiches.
                    Conversely, yellow onions offer a stronger, more robust
                    flavor that holds its structure well during cooking, making
                    them ideal for sautéed onion dishes, soups, stews, and
                    braises
                  </p>
                </div>
                <div className="col-md-5 animated fadeIn">
                  <div className="owl-carousel header-carousel">
                    <div className="right">
                      <img className="img-fluid" src="../white.jpg" alt="" />
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
                                  src="../shallots1.jpg"
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
                                "Shallots(multiplier onion)"{" "}
                              </span>
                            </h1>
                            <p className="mb-4 pb-2">
                              Shallot, locally known as “sibuyas Tagalog,” is a
                              spice crop extensively grown in the country
                              primarily for culinary purposes. In contrast to
                              other onion types, shallot has a milder and more
                              subtle flavor, which makes it a good ingredient
                              for pickling and garnishing.Shallots actually come
                              in both red and yellow skins just like onions.
                              However, peel back those dried-up skins and you’re
                              likely to find what looks like a narrow red onion
                              that’s not quite as purple as a red onion usually
                              is.The shallot is not only different in shape but
                              also in how it grows. Like garlic, the shallot
                              grows in clusters of two or more. That’s why when
                              you slice a shallot in half, you can expect to
                              find two separate halves of a bulb in what seems
                              to be a single bulb
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
