
import Navbar from "../Navbar/Navbar";
import { Container, Slide } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from "react";




const Header = React.forwardRef(function Header() {

  return (
    <Container sx={{ position: 'relative' }}>
      <Navbar />
    </Container>
  );
});

export default Header;
