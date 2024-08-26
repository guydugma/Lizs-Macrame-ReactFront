import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logos/logo-black-transparent-wide.png";

const NavLogo = () => {
  const navigate = useNavigate();

  return (
    <Box
      key={"logo"}
      sx={{
        height: {
          xs: "50px",
          sm: "100px",
          md: "150px",
          lg: "200px",
          xl: "200px",
        },
        flexShrink: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        src={logo}
        alt="logo"
        className="site-logo flex h-full"
        onClick={() => navigate("/")}
      />
    </Box>
  );
};
export default NavLogo;
