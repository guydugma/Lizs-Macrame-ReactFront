import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import AlertDialog from "../DeleteAlert/DeleteAlert";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";
import { useCategories } from "../../hooks/useCategories";
import EditCategory from "../EditItem/EditCategory";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "../AddItem/AddCategory";
import Categories from "../../routes/Categories";
import { CategoryType } from "../../@types/types";
import { CategoryContext } from "../../contexts/CategoryContext";

const ManageCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const {
    deleteAlert,
    setDeleteAlert,
    setMsgString,
    approveFunction,
    setApproveFunction,
  } = React.useContext(DeleteAlertContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    setCategories(categoryContext.categories);
    setIsLoading(categoryContext.categoriesLoading);
    setError(categoryContext.categoriesError);
  }, [
    ,
    categoryContext.categories,
    categoryContext.categoriesLoading,
    categoryContext.categoriesError,
  ]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const close = () => {
    setExpanded(false);
  };

  const openAlert = (msg: string, itemsToDelete: number[]) => {
    setMsgString(msg);
    setDeleteAlert(true);
    setApproveFunction(() => {
      itemsToDelete.forEach((item) => {
        console.log(item);
      });
    });
  };

  return (
    <Container maxWidth={"xl"} sx={{ width: "100%", flexDirection: "column" }}>
      {isLoading && <div>isLoading</div>}
      {error && <div>error</div>}
      <Accordion
        expanded={expanded === `panel0`}
        onChange={handleChange(`panel0`)}
        sx={{
          width: "100%",
          bgcolor: "#597E52",
          color: "white",
          flexDirection: "column",
        }}
      >
        <AccordionSummary
          sx={{ width: "100%" }}
          expandIcon={
            <IconButton edge="end" aria-label="add">
              <AddIcon sx={{ color: "white" }} />
            </IconButton>
          }
        >
          <Typography>הוספת קטגוריה</Typography>
        </AccordionSummary>
        {expanded === `panel0` && <AddCategory close={close} />}
      </Accordion>

      {!isLoading &&
        !error &&
        categories.map((category) => (
          <Accordion
            expanded={expanded === `panel${categories.indexOf(category) + 1}`}
            onChange={handleChange(`panel${categories.indexOf(category) + 1}`)}
            key={category._id}
            sx={{ width: "100%", flexDirection: "column" }}
          >
            <AccordionSummary
              sx={{ width: "100%" }}
              expandIcon={
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
            >
              <Typography>{category.hebTitle}</Typography>
            </AccordionSummary>

            {expanded === `panel${categories.indexOf(category) + 1}` && (
              <EditCategory category={category} close={close} />
            )}
          </Accordion>
        ))}
      <AlertDialog />
    </Container>
  );
};

export default ManageCategories;
