import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import fastLoremIpsum from "fast-lorem-ipsum";
import AddToCartBtn from "../components/AddToCardBtn/AddToCartBtn";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StoneCard from "../components/StoneCard/StoneCard";
import { useContext, useState } from "react";
import { HashLink } from "react-router-hash-link";
import Gallery from "../components/ImageGallery/ImageGallery";
import CircleIcon from "@mui/icons-material/Circle";
import { StoneContext } from "../contexts/StoneContext";
import { ProductType } from "../@types/types";
import { ProductsContext } from "../contexts/ProductsContext";

const ProductPage = () => {
  const stoneContext = useContext(StoneContext);
  const productsContext = useContext(ProductsContext);
  const { id } = useParams();
  const product =
    productsContext.getProductById(id ?? "") ?? ({} as ProductType);
  const [expanded, setExpanded] = useState<string | false>(false);

  const stone = stoneContext.getStoneByName(product?.stone ?? "");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 5,
        justifyContent: "space-around",
        color: "inherit",
        paddingBottom: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 5,
          justifyContent: "space-around",
          minHeight: "80vh",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{ wordBreak: "break-word", maxWidth: "90%" }}
        >
          {product.title}
        </Typography>
        {product.imageFileNames && <Gallery images={product.imageFileNames} />}
        <Card
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
            position: "sticky",
            minHeight: "70vh",
            top: "100px",
          }}
        >
          <CardContent>
            <Stack
              sx={{
                gap: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{product.description}</Typography>
              <Typography variant="h6">מחיר: {product.price} ש"ח</Typography>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                צבע חוטים:
                <CircleIcon sx={{ color: product.stringAColor }} />
                {product.stringBColor && (
                  <CircleIcon sx={{ color: product.stringBColor }} />
                )}
              </Typography>
              <HashLink elementId={"stone-tab"}>
                <Button variant="contained">
                  <Typography
                    variant="h6"
                    sx={{ gap: 1, display: "flex", alignItems: "center" }}
                  >
                    אבן- חן:
                    <img
                      className="h-5 w-5 rounded-sm"
                      src={`${import.meta.env.VITE_SERVER_URL}/public/stones/${
                        stone.imageFileName
                      }`}
                      alt={product.stone}
                    />
                  </Typography>
                </Button>
              </HashLink>
              <Typography
                variant="h6"
                color={"green"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CheckCircleRoundedIcon color="success" />
                במלאי
              </Typography>
              <CardActions>
                <AddToCartBtn productId={product._id} />
              </CardActions>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <div id="stone-tab">
        <StoneCard stone={stone} handleChange={handleChange(`panel1`)} />
      </div>
    </Container>
  );
};

export default ProductPage;
