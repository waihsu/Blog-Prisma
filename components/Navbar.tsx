"use client";
import "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "About",
    link: "/about",
    icon: <InfoIcon />,
  },
  {
    id: 3,
    name: "Contact",
    link: "/contact",
    icon: <PermContactCalendarIcon />,
  },
  {
    id: 4,
    name: "Sign Up",
    link: "/signup",
    icon: <ExitToAppIcon />,
  },
  {
    id: 5,
    name: "Log in",
    link: "/login",
    icon: <LoginIcon />,
  },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Navbar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const contextData = useContext(AuthContext);
  const { email, token, updateData } = contextData;

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    updateData({ token: null });
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChange = () => {
    setAuth((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                listStyle: "none",
              }}
              href={item.link}>
              {/* <ListItemIcon
                sx={{ bgcolor: "red", display: "inline" }}
                children={item.icon}
              /> */}
              {item.icon}
              <ListItemText
                sx={{ maxWidth: "fit-content" }}
                primary={item.name}
              />
              {/* {item.icon}
              <li>{item.name}</li> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "mediumturquoise" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          {token && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{email}</Typography>
              <Button variant="contained" onClick={logout}>
                Log out
              </Button>
            </Box>
          )}
          {!token && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="/login">
                <Button variant="contained">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="contained">Sign up</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
          }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
