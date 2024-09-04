import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "../index.css";
import { useContext } from "react";
import AlertDialog from "../components/DeleteAlert/DeleteAlert";
import { DeleteAlertContext } from "../contexts/DeleteAlertContext";
import { AlertContext } from "../contexts/AlertContext";
import ActionAlert from "../components/ActionAlert/ActionAlert";
import Header from "../components/Header/Header";

const Root = () => {
  const deleteAlertContext = useContext(DeleteAlertContext);
  const alertContext = useContext(AlertContext);

  return (
    <div className="flex flex-col align-items-center min-h-screen w-screen">
      <Header />
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          px: 0,
          flexGrow: 1,
          width: "100vw",
          height: "100%",
          my: 2,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
      {deleteAlertContext.deleteAlert && <AlertDialog />}
      <ActionAlert />
    </div>
  );
};

export default Root;
