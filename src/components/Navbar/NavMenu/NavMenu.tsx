import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { LogoutMenuBtn } from "../../LogoutBtn/LogoutBtn";
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

type Props = {
  pages: { heb: string; eng: string }[];
};

const NavMenu = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
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
  );
};
