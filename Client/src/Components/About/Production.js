import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";

const Production = () => {
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
      <div style={{ flex: "1", textAlign: "center", overflowY: "auto" }}>
      <div className="hero"></div>
      <img src="../production.jpg" className="img-fluid" alt="Wild Landscape" style={{maxWidth: '100%', height: '50%'}} width={1300} height={500} />
<hr/>
          

          <div className="row g-0 align-items-left flex-column-reverse flex-md-row">
  <div className="col-md-6" style={{ textAlign: "left" }}>
    <h2 style={{ color: "white", fontSize: "36px" }}>Onion Farming: Methods of Growing Onions</h2>
    <hr/>
    <p style={{ color: "white", fontSize: "24px" }}>
    <ul>
                    <li>
                      1) Soil/land preparation for onion. Onion thrives in any variety of soil: Sandy loam, and clay loam, as long as there are good drainage facilities and an optimum pH of 6.5 – 7.5.
                    </li>
                 <li>
                2) Plow and rake the soil to plant onions, and fertilize the soil, it is better to use organic fertilizer.
                </li>
		<li>
		3) Clean the soil and remove weeds around the plot. The soil needs to be moist or moist to make the onion roots stronger.
		</li>
		<li>
		4) Climatic conditions that matter to the onion. For onion growing, it is better to have a temperature of 13-24 degrees Celsius, and for fruiting, it is 30-35 degrees Celsius.
		</li>
		<li>
		5) Onion yields are expected to be better when the weather is mild, there is not much rain and extreme heat.
		</li>	
		<li>
		6) Irrigation or irrigation in onion farming. The onion orchard needs good irrigation.
		</li>
		<li>
		7) Irrigate the field three days after planting.
		</li>
		<li>
		8) Then it will follow after 7-10 days depending on soil conditions and weather.
		</li>
		<li>
		9) Also, avoid giving too much water to prevent the drowning of new onion plants.
		</li>
		<li>
		10) Weed control/herbicide. Weeds are one of the main enemies of crops, remove weeds that grow in the field itself and even around it
		</li>
		<li>
		11) Chemical spraying can be done for weeds, and it can also be done manually with your hands.
		</li>
                </ul>
    </p>
    <hr />
  </div>
  <div className="col-md-6 p-5 mt-lg-5">
    <div className="col-md-10 animated fadeIn">
      <div className="owl-carousel header-carousel">
        <div className="center">
          <img
            className="img-fluid"
            src="../growing.jpg"
            alt=""
          />
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
