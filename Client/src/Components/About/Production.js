import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Production = () => {
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
                    "Onion Farming: Methods of Growing Onions"{" "}
                  </span>
                </h1>
                <p className="animated fadeIn mb-4 pb-2 ">
                If you love planting and want to enter the onion farming business, you need to study the following:
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../on.png" alt="" />
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
                              {" "}
                            </span>
                          </h1>
                          <p className="mb-4 pb-2">
                  <ul>
                   <li>Soil/land preparation for onion. Onion thrives in any variety of soil: 
                    Sandy loam, and clay loam, as long as there are good drainage facilities and an optimum pH of 6.5 – 7.5.
                   <ul>
               </ul>
              </li>
              <li>Plow and rake the soil to plant onions, and fertilize the soil, it is better to use organic fertilizer.
                <ul>
               </ul>
              </li>
             <li>Clean the soil and remove weeds around the plot. The soil needs to be moist or moist to make the onion roots stronger.
                 </li>
                 <li>Climatic conditions that matter to the onion. For onion growing, 
                  it is better to have a temperature of 13-24 degrees Celsius, and for fruiting, it is 30-35 degrees Celsius.
                 </li>
                 <li>Onion yields are expected to be better when the weather is mild, 
                  there is not much rain and extreme heat.
                 </li>
                 <li>Irrigation or irrigation in onion farming. The onion orchard needs good irrigation.
                 </li>
                 <li>Irrigate the field three days after planting.
                 </li>
                 <li>Then it will follow after 7-10 days depending on soil conditions and weather.
                 </li>
                 <li>Also, avoid giving too much water to prevent the drowning of new onion plants.
                 </li>
                 <li>Weed control/herbicide. 
                  Weeds are one of the main enemies of crops, remove weeds that grow in the field itself and even around it.
                 </li>
                 <li>
                 Chemical spraying can be done for weeds, and it can also be done manually with your hands.
                 </li>
               </ul>
                </p>
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

export default Production;
