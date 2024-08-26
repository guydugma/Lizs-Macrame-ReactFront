import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import App from "../../App";

function Footer() {
  return (
    <AppBar position="relative" sx={{ bottom: 0 }}>
      <Container
        className="site-footer  font-extralight  text-center   bottom-0"
        maxWidth={false}
        sx={{
          padding: { xs: 0, sm: 0, lg: 3 },
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2">כל הזכויות שמורות</Typography>
      </Container>
    </AppBar>
  );
}

export default Footer;
