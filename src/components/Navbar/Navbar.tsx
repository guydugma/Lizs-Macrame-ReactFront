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
import { colors, Drawer, Slide, Stack } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import ProfileOptions from "./ProfileOptions/ProfileOptions";
import SearchBar from "./SearchBar/SearchBar";

import PetsIcon from "@mui/icons-material/Pets";
import "./Navbar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CartBtn from "../CartBtn/CartBtn";
import { ScrollContext } from "../../contexts/ScrollContext";
import NavLogo from "./NavLogo/NavLogo";
import { CategoryContext } from "../../contexts/CategoryContext";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import { Pages } from "@mui/icons-material";
import { pageLink } from "../../@types/types";
import NavBtn from "./NavBtn/NavBtn";

const generalPages: pageLink[] = [
  { heb: "עלינו", eng: "about" },
  { heb: "אבנים", eng: "Stones" },
];

const noUserPages: pageLink[] = [
  { heb: "הרשמה", eng: "register" },
  { heb: "התחברות", eng: "login" },
];

const adminUserPages = [{ heb: "ניהול", eng: "manage" }];

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isLoggedIn, userPrevileges, login, logout } = useContext(AuthContext);
  const scrollContext = React.useContext(ScrollContext);
  const [openCategories, setOpenCategories] = React.useState(false);
  const categoriesPages: pageLink[] = useContext(
    CategoryContext
  ).categories.map((c) => {
    return { heb: c.hebTitle, eng: c.engLink };
  });
  const containerRef = React.useRef<HTMLElement>(null);
  const toggleOpenCategories = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <Slide appear={false} direction="down" in={scrollContext.fixHeader}>
      <Box
        sx={{
          width: "100%",
          top: 0,
          flexDirection: "column",
          position: "fixed",
        }}
      >
        <AppBar
          className="site-nav"
          sx={{
            position: "relative",
            direction: "rtl",
            width: "100%",
            display: "flex",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: { xs: "row", sm: "column-reverse" },
            }}
            maxWidth={"xl"}
          >
            <Toolbar
              disableGutters
              sx={{
                position: "relative",
                zIndex: 2000,
                width: { xs: "auto", sm: "100%" },
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              {generalPages.map((page) => (
                <NavBtn key={page.eng} page={page} />
              ))}
              <Button
                onClick={toggleOpenCategories}
                sx={{ color: "inherit" }}
                endIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h6">קטגוריות</Typography>
              </Button>
              {isLoggedIn &&
                userPrevileges.isAdmin &&
                adminUserPages.map((page) => (
                  <NavBtn key={page.eng} page={page} />
                ))}
              {/* <SearchBar /> */}
              {!isLoggedIn &&
                noUserPages.map((page) => (
                  <NavBtn key={page.eng} page={page} />
                ))}
              {authContext.isLoggedIn && <LogoutBtn />}
              <CartBtn />
            </Toolbar>
            <NavLogo />
          </Container>
        </AppBar>
        <Box ref={containerRef} sx={{}}>
          <Slide
            direction="down"
            in={openCategories}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <AppBar
                sx={{
                  position: "sticky",
                  width: "100%",
                  display: "flex",
                  filter: "brightness(85%)",
                }}
              >
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  {categoriesPages.map((page) => (
                    <NavBtn key={page.eng} page={page} />
                  ))}
                </Toolbar>
              </AppBar>
            </Box>
          </Slide>
        </Box>
      </Box>
    </Slide>
  );
};
export default Navbar;
