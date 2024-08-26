import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Link,
  NavLink,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import auth, { userDetails } from "../../services/auth";
import { router } from "../../routes/router";
import { colors, Slide, Stack } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import ProfileOptions from "./ProfileOptions/ProfileOptions";
import SearchBar from "./SearchBar/SearchBar";
import NavLinks from "./NavLinks/NavLinks";
import PetsIcon from "@mui/icons-material/Pets";
import "./Navbar.scss";

import CartBtn from "../CartBtn/CartBtn";
import { ScrollContext } from "../../contexts/ScrollContext";
import NavLogo from "./NavLogo/NavLogo";

const generalPages = [
  { heb: "עלינו", eng: "about" },
  { heb: "קטגוריות", eng: "categories" },
  { heb: "אבנים", eng: "Stones" },
];

const noUserPages = [
  ...generalPages,
  { heb: "הרשמה", eng: "register" },
  { heb: "התחברות", eng: "login" },
];

const userPages = [...generalPages];

const adminUserPages = [...generalPages, { heb: "ניהול", eng: "manage" }];

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userPrevileges, login, logout } = useContext(AuthContext);
  const scrollContext = React.useContext(ScrollContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Slide appear={false} direction="down" in={scrollContext.fixHeader}>
      <AppBar
        className="site-nav"
        sx={{
          direction: "rtl",
          width: "100%",
          position: "sticky",
          display: "flex",
        }}
      >
        <Container
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          maxWidth={"xl"}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: { xs: "row", sm: "column-reverse" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                width: { xs: "auto", sm: "100%" },
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {isLoggedIn && userPrevileges.isAdmin && (
                <NavLinks pages={adminUserPages} />
              )}
              {isLoggedIn && !userPrevileges.isAdmin && (
                <NavLinks pages={userPages} />
              )}
              {/* <SearchBar /> */}
              {!isLoggedIn && <NavLinks pages={noUserPages} />}
            </Toolbar>
            <NavLogo />
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <CartBtn />
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Slide>
  );
};
export default Navbar;
