import Navbar from "../Navbar/Navbar";
import { Box, Container, Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";

const Header = React.forwardRef(function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: { xs: "none", sm: "10rem", md: "20rem" },
        zIndex: 1000,
      }}
    >
      <Navbar />
    </Box>
  );
});

export default Header;
