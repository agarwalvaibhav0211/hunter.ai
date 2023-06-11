import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CategoryIcon from "@mui/icons-material/Category";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TranscribeIcon from "@mui/icons-material/Transcribe";
import CssBaseline from "@mui/material/CssBaseline";
import Products from "./Products";
import Customer from "./Customer";
import Business from "./Business";
import CallComponent from "./Call"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Call from "@mui/icons-material/Call"
import { Avatar } from "@mui/material";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const drawerWidth = 240;

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState("Products");
  
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
        
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6" noWrap component="div">
            Hunter.ai
                  </Typography>
                  <Avatar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Products", "Business", "Leads","Call"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => setCurrentTab(text)}
                    selected={currentTab === text}
                  >
                    <ListItemIcon>
                      {text === "Products" && <CategoryIcon />}
                      {text === "Leads" && <SupportAgentIcon />}
                      {text === "Business" && <BusinessCenterIcon />}
                      {text === "Call" && <Call />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Toolbar />
        <Typography paragraph>
          {currentTab === "Products" && <Products />}
                  {currentTab === "Leads" && <Customer />}
                  {currentTab === "Business" && <Business />}
                  {currentTab === "Call" && <CallComponent />}
        </Typography>
      </Box>
    </Box>
  );
}
