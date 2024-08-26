import { createContext, useState } from "react";

export const DeleteAlertContext = createContext({
  deleteAlert: false,
  toggleAlert: () => {},
  msgString: "",
  setMessage: (string) => {},
  approveFunction: () => {},
  setFunc: (func: () => void) => {},
});

export const DeleteAlertProvider = (props: any) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [approveFunction, setApproveFunction] = useState(() => () => {});
  const [msgString, setMsgString] = useState("");

  const toggleAlert = () => {
    setDeleteAlert(!deleteAlert);
  };

  const setMessage = (msg: string) => {
    setMsgString(msg);
  };

  const setFunc = (func: () => void) => {
    setApproveFunction(func);
  };

  return (
    <DeleteAlertContext.Provider
      value={{
        approveFunction,
        msgString,
        deleteAlert,
        toggleAlert,
        setMessage,
        setFunc,
      }}
    >
      {props.children}
    </DeleteAlertContext.Provider>
  );
};
