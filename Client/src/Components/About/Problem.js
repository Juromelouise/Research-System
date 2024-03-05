import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Problem = () => {
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
                    "Price Increased in Onion"{" "}
                  </span>
                </h1>
                <p className="animated fadeIn mb-4 pb-2">
                 According to Philstar article on november 11,2023 the 
                 retail price of onions rise to P240 a kilo.
                 According to So, the DA should address the spike in the retail price of the 
                 bulbs and stop the unreasonable increase.
                  The retail price of onions started to increase by P30 per kilo on 
                  Nov. 7, setting the price at P220 per kilo in Metro Manila markets compared to 
                  the prevailing prices a week ago. 
                  As for DA’s price watch on Nov. 2, 
                  the highest retail price of local red onions was only P190 per kilo.
                </p>
              </div>
              <div className="col-md-5 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../pric.jpeg" alt="" />
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
                              "Regulator probing possible smuggling in onions being sold online"{" "}
                            </span>
                          </h1>
                          <p className="mb-4 pb-2">
                          The Bureau of Plant Industry (BPI) is investigating the possibility that 
                          onions being sold online were smuggled into the country. Import permits for 
                          legitimate traders have been fully utilized, indicating that the online onions are 
                          unlikely to have entered through regular channels. BPI Director Gerald Glenn F. Panganiban 
                          stated that shipments bypassing the Sanitary and Phytosanitary Import Clearance (SPSIC) permit 
                          and inspection process pose health risks. The BPI is coordinating with law enforcement agencies, 
                          including the Philippine National Police, to verify the sources of the online onions. Farmers are losing 
                          between P10,000 and P15,000 per hectare a month due to competition from smuggled onions, according to Agri 
                          Party-list Representative Wilbert T. Lee. Onions sold online are currently being offered at P15 to P20 per 
                          kilogram, while domestically grown red onions retail for between P60 and P120 per kilo, and imported red onions fetch P90 to P100. 
                          Domestically grown white onions are selling for P60 to P90 per kilo, while imported varieties are offered at P80 to P120
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
                    <span className="text-primary">"Pest infestations have ravaged onion farmers’ crops" </span>
                  </h1>
                  <p className="animated fadeIn mb-4 pb-2">
                  Since the arrival of the fall armyworm (Spodoptera frugiperda) in the Philippines in 2016, farmers,
                   especially onion farmers in Bayambang, have faced significant challenges. In Bayambang, where around 
                   1,500 hectares are dedicated to onion farming, over 800 hectares of onion plantations have been destroyed 
                   by fall armyworm infestations, leading the town to declare a state of calamity. Farmers have resorted to excessive 
                   use of chemical pesticides, resulting in debt and the development of pest resistance. 
                  This ineffective cycle has trapped farmers who struggle to afford more pesticides, exacerbating their losses
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
            </div>
        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
      </div>
    </div>
  );
};

export default Problem;
