import { Box, Button, Container, Typography } from "@mui/material";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthContext";
import { LogoutBtn, LogoutMenuBtn } from "../../LogoutBtn/LogoutBtn";

type Props = {
  page: { heb: string; eng: string };
};

const NavBtn = (props: Props) => {
  const page = props.page;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  return (
    <Button
      key={page["eng"]}
      onClick={() => {
        navigate(`/${page.eng.replace(" ", "_")}`);
      }}
      sx={{ color: "inherit" }}
    >
      <Typography variant="h6">{page["heb"]}</Typography>
    </Button>
  );
};

export default NavBtn;
