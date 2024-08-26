import { createContext, useContext, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import { ProductType } from "../@types/types";
import { CategoryContext } from "./CategoryContext";

export const FilterContext = createContext({
  filterByCategory: (category: string) => {},
  filteredProducts: [{}] as ProductType[],
});

const FilterContextProvider = ({ children }) => {
  const productsContext = useContext(ProductsContext);
  const categoryContext = useContext(CategoryContext);
  const [categoryFilter, setCategoryFilter] = useState([""]);
  const [filteredProducts, setFilteredProducts] = useState(
    productsContext.products
  );

  const filterByCategory = (categoryEng: string) => {
    if (categoryEng === "") {
      setFilteredProducts(productsContext.products);
    } else {
      categoryContext.categories.forEach((category) => {
        if (category.engLink.toLowerCase() === categoryEng.toLowerCase()) {
          setFilteredProducts(
            productsContext.products.filter(
              (product) => product.category === category.hebTitle
            )
          );
        }
      });
    }
  };

  return (
    <FilterContext.Provider value={{ filterByCategory, filteredProducts }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
