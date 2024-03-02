import { Divider, List } from "@mui/material";
import React, { useState } from "react";
import {LeftItemList} from "./LeftItemList";

const About = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
   
      <div style={{ width: "20%", marginRight: "10px" }}>
        {LeftItemList} 
      </div>


      <div style={{ flex: "1", textAlign: "center" }}>
        <h1>About Page Content</h1>
      

        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
      </div>
    </div>
  );
};

export default About;
