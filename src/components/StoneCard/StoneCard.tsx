import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from "@mui/material";
import Zodiac from "../Zodiac/Zodiac";
import "./StoneCard.scss";
import { StoneType } from "../../@types/types";

type Props = {
  stone: StoneType;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

function StoneCard(props: Props) {
  const stone = props.stone;
  const handleChange = props.handleChange;

  return (
    <Accordion
      onChange={handleChange}
      key={stone._id}
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <AccordionSummary
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography variant="h2">{stone.name}</Typography>
        <img
          alt={stone.name}
          src={`${import.meta.env.VITE_SERVER_URL}/public/stones/${
            stone.imageFileName
          }`}
          className="h-20 justify-end rounded-lg"
        />
      </AccordionSummary>
      <AccordionDetails sx={{ width: "100%", flexDirection: "column" }}>
        {stone.zodiac && (
          <Typography>
            מזל: <Zodiac zodiac={stone.zodiac} />
          </Typography>
        )}
        <Divider />
        <Typography>{stone.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default StoneCard;
