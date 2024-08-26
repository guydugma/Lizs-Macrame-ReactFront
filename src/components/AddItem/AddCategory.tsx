import {
  AccordionActions,
  AccordionDetails,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { CategoryType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { addCategory } from "../../services/categories";
import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import AlertDialog from "../DeleteAlert/DeleteAlert";
import { AuthContext } from "../../contexts/AuthContext";
import "./AddCategory.scss";
import { CategoryContext } from "../../contexts/CategoryContext";

type Props = {
  close: () => void;
};

const AddCategory = (props: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const categoryContext = useContext(CategoryContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({});

  const showAlert = (msg: string, severity: string) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const onRegister = (data: CategoryType) => {
    addCategory(data)
      .then((res) => {
        //201 response
        categoryContext.refresh();
        props.close();
        showAlert("Stone updated successfully", "success");
      })
      .catch((e) => {
        console.log(localStorage.getItem("token"));
        setAlert(true);
        showAlert("There was an error updating the stone", "error");
      });
  };

  return (
    <AccordionDetails
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& *": { color: "white", direction: "rtl" },
      }}
    >
      <Form
        onSubmit={handleSubmit(onRegister)}
        className="w-full justify-around flex flex-col"
      >
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          {/* Hebrew Title */}
          <TextField
            type="text"
            fullWidth
            label="שם"
            placeholder="שם בעברית"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
            {...register("hebTitle", { required: true })}
          />

          {/* English Title */}
          <TextField
            type="text"
            fullWidth
            label="Name"
            placeholder="שם באנגלית"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
            {...register("engLink", { required: true })}
          />

          <AccordionActions
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ width: "50%" }}
            >
              Save
            </Button>
          </AccordionActions>
        </Stack>
      </Form>
    </AccordionDetails>
  );
};

export default AddCategory;
