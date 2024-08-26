import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from "@mui/material"
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { useEffect, useState } from "react";
import { useStones } from "../hooks/useStones";
import Zodiac from "../components/Zodiac/Zodiac";
import StoneCard from "../components/StoneCard/StoneCard";

const Stones = () => {
  const { stones, isLoading, error } = useStones();
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {

  }, [error, isLoading])

  return (<Container>
    {isLoading && <div>{isLoading}</div>}
    {error && <div>{error}</div>}
    {(!isLoading && !error) &&
      stones.map(stone => <StoneCard key={stone._id} stone={stone} handleChange={handleChange(`panel${stones.indexOf(stone)}`)} />)}
  </Container >)
}

export default Stones;

