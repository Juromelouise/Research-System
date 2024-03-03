import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import GridViewIcon from "@mui/icons-material/GridView";
import SpaIcon from "@mui/icons-material/Spa";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Link } from "@mui/material";

export const LeftItemList = (
  <React.Fragment>
    <Link href="/about" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>
    <Link href="/about/onion types" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <GridViewIcon />
        </ListItemIcon>
        <ListItemText primary="Types" />
      </ListItemButton>
    </Link>
    <Link href="/about/season" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Season" />
      </ListItemButton>
    </Link>
    <Link href="/about/fertilizers" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <SpaIcon />
        </ListItemIcon>
        <ListItemText primary="Fertilizer" />
      </ListItemButton>
    </Link>
    <Link href="/about/production" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText primary="Production" />
      </ListItemButton>
    </Link>
    <Link href="/about/challenges" underline="none" color="#1c1c1c">
      <ListItemButton>
        <ListItemIcon>
          <ReportProblemIcon />
        </ListItemIcon>
        <ListItemText primary="Problem" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
