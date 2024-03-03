import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Types = () => {
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
                    "The different types of onion "{" "}
                  </span>
                </h1>
                <p className="animated fadeIn mb-4 pb-2">
                  In the Philippines, the most commonly cultivated onion
                  varieties include Red Creole (red onion), Yellow Granex (white
                  onion), and shallot (multiplier onion). Recently, native onion
                  cultivars such as Tanduyong and Batanes are gaining popularity
                  for export purposes.
                </p>
              </div>
              <div className="col-md-5 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../oniontypes.jpg" alt="" />
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
                                src="../red onion.jpg"
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
                              " Red onion"{" "}
                            </span>
                          </h1>
                          <p className="mb-4 pb-2">
                            Red onion is a popular vegetable in the Philippines.
                            It is used in many dishes and is considered a staple
                            in Filipino cuisine.Over the past few years, the
                            price of red onions has fluctuated dramatically due
                            to several factors including supply chain
                            disruptions, extreme weather events, and import
                            policies. the red onion industry in the Philippines
                            faces complex challenges related to pricing, climate
                            change, and trade policy, which require careful
                            attention and strategic solutions to ensure the
                            long-term sustainability of the sector and the
                            wellbeing of local farmers
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
    </div>
  );
};

export default Types;
