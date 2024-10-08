import { Button, MenuItem, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  closeMenu: () => void;
};

export const LogoutMenuBtn = (props: Props) => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;

  return (
    <MenuItem
      sx={{ textAlign: "center", width: "50vw" }}
      onClick={() => {
        logout();
        props.closeMenu();
      }}
    >
      <Typography textAlign="center">התנתקות</Typography>
    </MenuItem>
  );
};

export const LogoutBtn = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        logout();
        navigate("/");
      }}
      sx={{ color: "inherit" }}
    >
      <Typography variant="h6">התנתקות</Typography>
    </Button>
  );
};
