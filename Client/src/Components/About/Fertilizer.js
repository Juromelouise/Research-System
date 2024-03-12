import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Fertilizer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
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
      <div style={{ flex: "1", overflowY: "auto" }}>
      <img src="../fertilizer.jpg" className="img-fluid" alt="Wild Landscape" style={{maxWidth: '100%', height: '50%'}} width={1300} height={300} />
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
                    ORGANIC FERTILIZER{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
    <ul>
    Organic onion grows without the use of artificial pesticides or herbicides. Instead, they are grown naturally through crop rotation, composting, and the use of helpful insects to combat pests. Both the environment and human health are protected in this process.
</ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../org.jpg" alt="" />
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
                  FISH EMULSION FERTILIZER{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
    <ul>
    Fish fertilizer contains high levels of essential nutrients like nitrogen, phosphorus, potassium, calcium, magnesium, and sulfur, all important components required by onion plants for growth. 
    Fish fertilizers are excellent for growing onions naturally without overwhelming them with synthetic chemicals or burning roots due to imbalanced pH levels in conventional types often encountered issues with commercial-grade products. 
    Find yourself pleased at how much healthier your bulbs will be with this eco-friendly option!
    </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../fff.jpg" alt="" />
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
                    FISH AMINO ACID{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
    <ul>
    Fish entrails are used to make fish amino acids (FAA), a natural fertilizer. 
    They give plants easily accessible nitrogen and essential amino acids, which enhance growth while improving the condition of the soil it can be used as a foliar spray or soil drench.
    </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../faa.png" alt="" />
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
                    COMPOST{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
    <ul>
    Compost is a rich source of organic matter and nutrients improving soil structure, drainage, and fertilizer. 
    You can make your own compost from kitchen scraps or yard waste.
    </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../fertilizer.jpeg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
      </div>
    </div>
  );
};

export default Fertilizer;
