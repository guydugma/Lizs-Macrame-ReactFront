import { Box, Container, Grid } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import logo from "../assets/Logos/Logo2.jpg";

const Home = () => {
  const productsContext = useContext(ProductsContext);

  return (
    <Box
      className="text-brown"
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img src={logo} />
      {productsContext.productsLoading && (
        <div>loading {productsContext.productsLoading}</div>
      )}
      {productsContext.productsError && (
        <div>error {productsContext.productsError}</div>
      )}
      {productsContext.products.length > 0 && (
        <Grid
          container
          className="flex flex-row  items-center"
          rowGap={6}
          columnGap={1}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "auto",
          }}
        >
          {productsContext.products.map((product) => (
            <Grid item key={product._id} sx={{ justifyContent: "center" }}>
              <ProductCard product={product} />
            </Grid>
          ))}
          <Grid item sx={{ width: "200px" }}></Grid>
          <Grid item sx={{ width: "200px" }}></Grid>
          <Grid item sx={{ width: "200px" }}></Grid>
          <Grid item sx={{ width: "200px" }}></Grid>
          <Grid item sx={{ width: "200px" }}></Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;
