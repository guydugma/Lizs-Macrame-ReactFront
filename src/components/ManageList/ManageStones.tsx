import {
  Accordion,
  AccordionSummary,
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
import { useStones } from "../../hooks/useStones";
import EditStone from "../EditItem/EditStone";
import AddIcon from "@mui/icons-material/Add";
import AddStone from "../AddItem/AddStone";
import { StoneContext } from "../../contexts/StoneContext";
import { StoneType } from "../../@types/types";

const ManageStones = () => {
  const [stones, setStones] = useState<StoneType[]>([]);
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
  const stonesContext = useContext(StoneContext);

  useEffect(() => {
    setStones(stonesContext.stones);
    setIsLoading(stonesContext.stonesLoading);
    setError(stonesContext.stonesError);
  }, [
    ,
    stonesContext.stones,
    stonesContext.stonesError,
    stonesContext.stonesLoading,
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
          <Typography>הוספת אבן</Typography>
        </AccordionSummary>
        {expanded === `panel0` && <AddStone close={close} />}
      </Accordion>

      {!isLoading &&
        !error &&
        stones.map((stone) => (
          <Accordion
            expanded={expanded === `panel${stones.indexOf(stone) + 1}`}
            onChange={handleChange(`panel${stones.indexOf(stone) + 1}`)}
            key={stone._id}
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
              <Typography>{stone.name}</Typography>
            </AccordionSummary>
            {expanded === `panel${stones.indexOf(stone) + 1}` && (
              <EditStone stone={stone} />
            )}
          </Accordion>
        ))}
      <AlertDialog />
    </Container>
  );
};

export default ManageStones;
