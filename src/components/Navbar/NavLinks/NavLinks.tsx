import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { ReactNode, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import CartBtn from "../../CartBtn/CartBtn";
import { AuthContext } from "../../../contexts/AuthContext";
import { LogoutBtn, LogoutMenuBtn } from "../../LogoutBtn/LogoutBtn";

type Props = {
  pages: { heb: string; eng: string }[];
};

const NavLinks = (props: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const authContext = useContext(AuthContext);

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
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {props.pages.map((page) => (
            <MenuItem
              key={page["eng"]}
              onClick={() => {
                handleCloseNavMenu();
                navigate(`/${page["eng"].replace(" ", "_")}`);
              }}
              sx={{ textAlign: "center", width: "50vw" }}
            >
              <Typography textAlign="center">{page["heb"]}</Typography>
            </MenuItem>
          ))}
          {authContext.isLoggedIn && (
            <LogoutMenuBtn closeMenu={handleCloseNavMenu} />
          )}
        </Menu>
      </Box>

      <Container
        maxWidth={"xl"}
        sx={{
          width: "100%",
          display: { xs: "none", sm: "flex", md: "flex" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {props.pages.map((page) => (
          <Button
            key={page["eng"]}
            onClick={() => {
              navigate(`/${page["eng"].replace(" ", "_")}`);
              handleCloseNavMenu;
            }}
            sx={{ color: "inherit" }}
          >
            <Typography variant="h6">{page["heb"]}</Typography>
          </Button>
        ))}
        {authContext.isLoggedIn && <LogoutBtn />}
        <CartBtn />
      </Container>
    </>
  );
};

export default NavLinks;
