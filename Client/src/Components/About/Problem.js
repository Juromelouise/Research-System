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
        <h1>Problem</h1>
        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
      </div>
    </div>
  );
};

export default Problem;
