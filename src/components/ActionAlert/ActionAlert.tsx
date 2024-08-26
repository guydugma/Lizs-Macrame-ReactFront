import Alert, { AlertColor } from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { Fade } from "@mui/material";

const ActionAlert = () => {
  const alertContext = useContext(AlertContext);
  const [showAlert, setShowAlert] = useState(alertContext.showAlert);
  const [severity, setSeverity] = useState<AlertColor>(alertContext.severity);
  const [msg, setMsg] = useState(alertContext.msg);

  useEffect(() => {
    setSeverity(alertContext.severity);
    setMsg(alertContext.msg);
    setShowAlert(alertContext.showAlert);
  }, [alertContext.msg, alertContext.severity, alertContext.showAlert]);

  return (
    <Fade in={showAlert}>
      <Alert
        severity={severity}
        sx={{
          position: "absolute",
          width: "100%",
          height: "50px",
          zIndex: 2000,
        }}
      >
        {msg}
      </Alert>
    </Fade>
  );
};

export default ActionAlert;
