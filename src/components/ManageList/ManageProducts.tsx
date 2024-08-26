import {
  Accordion,
  AccordionSummary,
  Box,
  Container,
  Divider,
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
import { useProducts } from "../../hooks/useProducts";
import { ProductType } from "../../@types/types";
import { ProductsContext } from "../../contexts/ProductsContext";
import AddCategory from "../AddItem/AddCategory";
import EditCategory from "../EditItem/EditCategory";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "../AddItem/AddProduct";
import EditProduct from "../EditItem/EditProduct";

const ManageProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
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
  const productsContext = useContext(ProductsContext);

  useEffect(() => {
    setProducts(productsContext.products);
    setIsLoading(productsContext.productsLoading);
    setError(productsContext.productsError);
  }, [
    ,
    productsContext.products,
    productsContext.productsLoading,
    productsContext.productsError,
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
    <Container
      maxWidth={"xl"}
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
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
          <Typography>הוספת מוצר</Typography>
        </AccordionSummary>
        {expanded === `panel0` && <AddProduct close={close} />}
      </Accordion>

      {!isLoading &&
        !error &&
        products.map((product) => (
          <Accordion
            expanded={expanded === `panel${products.indexOf(product) + 1}`}
            onChange={handleChange(`panel${products.indexOf(product) + 1}`)}
            key={product._id}
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
              <Typography>{product.title}</Typography>
            </AccordionSummary>

            {expanded === `panel${products.indexOf(product) + 1}` && (
              <EditProduct product={product} close={close} />
            )}
          </Accordion>
        ))}
      <AlertDialog />
    </Container>
  );
};

export default ManageProducts;
