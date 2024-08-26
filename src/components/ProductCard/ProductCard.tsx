import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ProductType } from "../../@types/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";

type Props = {
  product: ProductType;
};

const ProductCard = (props: Props) => {
  const product = props.product;
  const [index, setIndex] = useState(0);
  const [startFade, setStartFade] = useState(false);
  const [hideImg, setHideImg] = useState(false);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 3000 },
    onRest: (_a, _b, item) => {
      if (index === item) {
        setIndex((state) => (state + 1) % product.imageFileNames.length);
      }
    },
    exitBeforeEnter: true,
  });

  return (
    <Link to={`/products/${props.product._id}`}>
      <Card
        sx={{
          width: "200px",
          height: "350px",
        }}
      >
        <Stack sx={{ width: "100%", height: "100%" }}>
          <Box
            onMouseEnter={() => {
              setHideImg(true);
              setStartFade(true);
            }}
            onMouseLeave={() => {
              setHideImg(false);
              setStartFade(false);
            }}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundImage: `url(${
                import.meta.env.VITE_SERVER_URL
              }/public/products/${product.imageFileNames[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap={true}
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "flex",
                flexShrink: 1,
                textOverflow: "ellipsis",
              }}
              variant="body1"
            >
              {props.product.title}
            </Typography>
            <Typography>{`${props.product.price} ש"ח`}</Typography>
          </Container>
        </Stack>
      </Card>
    </Link>
  );
};

export default ProductCard;
