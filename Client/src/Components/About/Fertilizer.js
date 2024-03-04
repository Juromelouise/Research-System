import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Fertilizer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex", height: "100vh", textAlign: "left" }}>
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
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-6 p-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <h1 className="display-5 mb-4 text-center">
                <span className="text-primary">"Organic Fertilizer"</span>
              </h1>
              <p className="mb-4 pb-2">
                Organic onion grows without the use of artificial pesticides or herbicides. Instead, they are grown naturally through crop rotation, composting, and the use of helpful insects to combat pests. Both the environment and human health are protected in this process.
              </p>
            </div>
            <div className="col-md-6 p-5">
              <img className="img-fluid" src="../org.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-6 p-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <h1 className="display-5 mb-4 text-center">
                <span className="text-primary">"Fish Emulsion Fertilizer"</span>
              </h1>
              <p className="mb-4 pb-2">
                Fish fertilizer contains high levels of essential nutrients like nitrogen, phosphorus, potassium, calcium, magnesium, and sulfur, all important components required by onion plants for growth. Fish fertilizers are excellent for growing onions naturally without overwhelming them with synthetic chemicals or burning roots due to imbalanced pH levels in conventional types often encountered issues with commercial-grade products. Find yourself pleased at how much healthier your bulbs will be with this eco-friendly option!
              </p>
            </div>
            <div className="col-md-6 p-5">
              <img className="img-fluid" src="../fishem.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-6 p-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <h1 className="display-5 mb-4 text-center">
                <span className="text-primary">"Compost"</span>
              </h1>
              <p className="mb-4 pb-2">
                Compost is a rich source of organic matter and nutrients improving soil structure, drainage, and fertilizer. You can make your own compost from kitchen scraps or yard waste.
              </p>
            </div>
            <div className="col-md-6 p-5">
              <img className="img-fluid" src="../fertilizer.jpeg" alt="" />
            </div>
          </div>
        </div>

        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-6 p-5" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <h1 className="display-5 mb-4 text-center">
                <span className="text-primary">"Fish Amino Acid"</span>
              </h1>
              <p className="mb-4 pb-2">
                Fish entrails are used to make fish amino acids (FAA), a natural fertilizer. They give plants easily accessible nitrogen and essential amino acids, which enhance growth while improving the condition of the soil it can be used as a foliar spray or soil drench.
              </p>
            </div>
            <div className="col-md-6 p-5">
              <img className="img-fluid" src="../faa.jpg" alt="" />
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
