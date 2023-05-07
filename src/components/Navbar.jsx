import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../theme/theme";
import { NavHashLink } from "react-router-hash-link";
import { menuOptions } from "../constants";
import { navbarStyles } from "../theme/styles";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsHome(false);
      } else {
        setIsHome(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClink = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={navbarStyles.root}>
        {/* navbar */}
        <Box sx={navbarStyles.navSection}>
          {isHome ? (
            <Box
              component="img"
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt=""
              sx={navbarStyles.navItems}
            />
          ) : (
            <Box sx={navbarStyles.navItems} />
          )}
          <IconButton sx={navbarStyles.iconButton} onClick={toggleDrawer}>
            <MenuIcon sx={navbarStyles.menuIcon} />
          </IconButton>
        </Box>

        {/* menu drawer */}
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: navbarStyles.drawerPaperProps,
          }}
          disableScrollLock={true}
          variant="persistent"
        >
          <Box sx={navbarStyles.drawerContainer}>
            {/* close button */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                alignSelf: "flex-end",
                marginTop: { xs: 1, md: -1 },
                marginRight: { xs: 3, md: 6 },
                color: "background.default",
              }}
            >
              <CloseIcon sx={navbarStyles.closeIcon} />
            </IconButton>

            {/* menu options */}
            <Box sx={navbarStyles.menuSection}>
              {menuOptions.map((o) => (
                <NavHashLink
                  to={o.to}
                  smooth
                  style={navbarStyles.hashLink}
                  onClick={handleClink}
                >
                  <Typography sx={navbarStyles.textOptions}>
                    {o.name}
                  </Typography>
                </NavHashLink>
              ))}
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </ThemeProvider>
  );
}
