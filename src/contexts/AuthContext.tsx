import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { decodedType } from "../@types/types";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";

export const AuthContext = createContext({
  isLoggedIn: false,
  userPrevileges: { _id: "", isAdmin: false },
  login: (jwt: string) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPrevileges, setUserPrevileges] = useState({
    _id: "",
    isAdmin: false,
  });
  const alertContext = useContext(AlertContext);

  // run code once - when the component is mounted:
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserPrevileges(jwtDecode(token));
      localStorage.setItem("user_id", userPrevileges._id);
    }
  }, []);

  const login = (jwt: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", jwt);
    console.log(jwtDecode(jwt));
    setUserPrevileges(jwtDecode(jwt));
    localStorage.setItem("user_id", userPrevileges._id);
  };

  const showAlert = (msg: string, severity: string) => {
    alertContext.changeMsg(msg);
    alertContext.changeSeverity(severity);
    alertContext.toggleAlert();
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    showAlert("התנתקת בהצלחה", "success");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userPrevileges, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
