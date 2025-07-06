// components/Layout/ResponsiveLayout.tsx
"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import Logout icon

const drawerWidth = 240;

interface ResponsiveLayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
  sidebarContent?: ReactNode;
  appBarTitle?: string;
  onLogout?: () => void; // Optional logout function prop
  // Add any other props you might need for customization
}

function ResponsiveLayout({
  window,
  children,
  sidebarContent,
  appBarTitle = "Your App Title",
  onLogout,
}: ResponsiveLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar /> {/* Add content for the top of the drawer if needed */}
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/">
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {sidebarContent ? (
          <>{sidebarContent}</>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/settings">
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            {/* Add more default sidebar items if needed */}
          </>
        )}
        {onLogout && (
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <IconButton color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {/* You could also place the logout button outside the List if preferred */}
      {/* {onLogout && (
        <Box sx={{ p: 2 }}>
          <Button variant="outlined" color="inherit" fullWidth onClick={onLogout}>
            <ExitToAppIcon sx={{ mr: 1 }} />
            Logout
          </Button>
        </Box>
      )} */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {appBarTitle}
          </Typography>
          {/* Add other AppBar elements (e.g., user icon) here */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        {/* The mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* The permanent drawer (visible on larger screens) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* To offset the fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveLayout;
