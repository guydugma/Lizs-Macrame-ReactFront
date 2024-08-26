import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";
import { set } from "core-js/core/dict";
import { themeOptions } from "../../contexts/CustomThemeContext";
import { useTheme } from "@mui/material";

const DeleteAlert = () => {
  const deleteAlertDialog = useContext(DeleteAlertContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(deleteAlertDialog.deleteAlert);
  }, [deleteAlertDialog.deleteAlert]);

  const handleClose = () => {
    deleteAlertDialog.toggleAlert();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        direction: "inherit",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DialogTitle>מחיקת פריטים</DialogTitle>
      <DialogContent>
        <DialogContentText>
          האם למחוק את '{deleteAlertDialog.msgString}'?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose} variant="text" autoFocus>
          ביטול
        </Button>
        <Button
          onClick={() => {
            deleteAlertDialog.approveFunction();
            handleClose();
          }}
          variant="text"
          color="error"
        >
          מחיקה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
