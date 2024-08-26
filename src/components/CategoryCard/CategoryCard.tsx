import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { CategoryType } from "../../@types/types";
import "./CategoryCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

type Props = {
  category: CategoryType;
};

const CategoryCard = (props: Props) => {
  const category = props.category;
  const navigate = useNavigate();

  return (
    <Grid
      item
      sx={{
        height: { xs: "100px", sm: "200px" },
        width: "100%",
        objectFit: "contain",
      }}
    >
      <Box
        onClick={() => navigate(`/categories/${category.engLink}`)}
        sx={{
          backgroundImage: `url(${
            import.meta.env.VITE_SERVER_URL
          }/public/products/${category.imageFileNames[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            position: "relative",
            color: "white",
            left: "5px",
            top: "5px",
            textShadow: "2px 2px 2px black",
          }}
        >
          {category.hebTitle}
        </Typography>
      </Box>
    </Grid>
  );
};

export default CategoryCard;
