import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { error } from "console";
import { CategoryType } from "../@types/types";

const Categories = () => {
  const categoryContext = useContext(CategoryContext);
  const [categories, setCategories] = useState<CategoryType[]>(
    categoryContext.categories
  );
  const [isLoading, setIsLoading] = useState(categoryContext.categoriesLoading);
  const [error, setError] = useState<string | null | undefined>(
    categoryContext.categoriesError
  );

  useEffect(() => {
    setCategories(categoryContext.categories);
  }, [
    categoryContext.categories,
    categoryContext.categoriesLoading,
    categoryContext.categoriesError,
  ]);

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      {isLoading && <div>{isLoading}</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <Grid
          container
          columns={2}
          rowGap={2}
          sx={{
            alignContent: "center",
            justifyContent: "flex-start",
            paddingTop: 2,
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={categories.indexOf(category)}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Categories;
