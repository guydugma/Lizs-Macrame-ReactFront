import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import auth from '../../../services/auth';
import { userDetails } from '../../../services/auth';
import { RegisterUser } from '../../../@types/types';
import { useUser } from "../../../hooks/useUser";

const settings = ['Profile', 'Account', 'Dashboard'];


const ProfileOptions = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const authContext = React.useContext(AuthContext);
  const userDetails = useUser();




  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (<Box sx={{ flexGrow: 0, ml: 2 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={userDetails?.user?.name?.first.toUpperCase()} src={`${userDetails?.user?.image?.url}`} />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}

      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={() => {
          handleCloseUserMenu();
          navigate(`/${setting}`);
        }}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>

      ))}
      <MenuItem key="logout" onClick={() => {
        handleCloseUserMenu();
        authContext.logout();
      }}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>
  </Box>);
}

export default ProfileOptions;