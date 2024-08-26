import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilterContext } from "../contexts/FilterContext";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { CategoryContext } from "../contexts/CategoryContext";

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState("");
  const filterContext = useContext(FilterContext);
  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    filterContext.filterByCategory(category ?? "");
    setCategoryTitle(categoryContext.getTitle(category ?? ""));
  }, []);

  return (
    <Container sx={{ marginTop: 2, justifyContent: "center" }}>
      <Typography
        variant="h2"
        sx={{ justifyContent: "center", marginBottom: 2 }}
      >
        {categoryTitle}
      </Typography>
      <Grid container columns={2} sx={{ justifyContent: "space-between" }}>
        {filterContext.filteredProducts.map((product) => (
          <Grid
            item
            xs={1}
            sm={6}
            md={4}
            lg={3}
            key={product._id}
            sx={{ justifyContent: "center", my: 1 }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
