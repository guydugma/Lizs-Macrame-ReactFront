import { CategoryType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { deleteCategory, editCategory } from "../../services/categories";
import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Form } from "react-router-dom";
import AlertDialog from "../DeleteAlert/DeleteAlert";
import { CategoryContext } from "../../contexts/CategoryContext";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";
import { AlertContext } from "../../contexts/AlertContext";

type Props = {
  category: CategoryType;
  close: () => void;
};

const EditCategory = (props: Props) => {
  let currentCategory = props.category;
  const [category, setCategory] = useState(currentCategory);
  const { setAlert } = useContext(AlertContext);
  const deleteAlertContext = useContext(DeleteAlertContext);
  const categoryContext = useContext(CategoryContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({});

  const onDelete = () => {
    deleteAlertContext.setMessage(category.hebTitle);
    deleteAlertContext.setFunc(() => () => {
      deleteCategory(category._id)
        .then((res) => {
          //201 response
          props.close();
          categoryContext.refresh();
          setAlert("הקטגוריה נמחקה בהצלחה", "success");
        })
        .catch((e) => {
          setAlert("הייתה בעיה במחיקת הקטגוריה", "error");
        });
    });
    deleteAlertContext.toggleAlert();
  };

  const onRegister = (data: CategoryType) => {
    editCategory(category._id, data)
      .then((res) => {
        //201 response
        props.close();
        categoryContext.refresh();
        setAlert("הקטגוריה עודכנה בהצלחה", "success");
      })
      .catch((e) => {
        setAlert("הייתה בעיה בעדכון הקטגוריה", "error");
      });
  };

  return (
    <AccordionDetails
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Form onSubmit={handleSubmit(onRegister)} className="w-full">
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          {/*Hebrew Title */}
          <TextField
            defaultValue={category.hebTitle}
            placeholder="שם בעברית"
            label="שם"
            type="text"
            fullWidth
            sx={{ width: "100%" }}
            {...register("hebTitle", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.hebTitle && (
            <p className="text-red-500">{errors.hebTitle.message}</p>
          )}

          {/*English Title */}
          <TextField
            defaultValue={category.engLink}
            placeholder="שם באנגלית"
            label="Name"
            type="text"
            sx={{ width: "100%" }}
            {...register("engLink", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
            fullWidth
          />
          {errors.engLink && (
            <p className="text-red-500">{errors.engLink.message}</p>
          )}

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
              sx={{ width: "40%" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              sx={{ width: "40%" }}
              onClick={onDelete}
            >
              Delete
            </Button>
          </AccordionActions>
        </Stack>
      </Form>
    </AccordionDetails>
  );
};

export default EditCategory;
