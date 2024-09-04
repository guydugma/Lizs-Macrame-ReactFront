import { AlertColor } from "@mui/material/Alert";
import { createContext, useState } from "react";

export const AlertContext = createContext({
  showAlert: false,
  severity: "success" as AlertColor,
  msg: "",
  toggleAlert: () => {},
  changeSeverity: (string) => {},
  changeMsg: (string) => {},
  setAlert: (newMsg: string, newSeverity: AlertColor) => {},
});

export const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");

  const toggleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const changeSeverity = (newSeverity: AlertColor) => {
    setSeverity(newSeverity);
  };

  const changeMsg = (newMsg: string) => {
    setMsg(newMsg);
  };

  const setAlert = (newMsg: string, newSeverity: AlertColor) => {
    changeMsg(newMsg);
    changeSeverity(newSeverity);
    toggleAlert();
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        setAlert,
        severity,
        msg,
        toggleAlert,
        changeSeverity,
        changeMsg,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
