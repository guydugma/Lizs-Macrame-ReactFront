import { createContext, useEffect, useState } from "react";
import { CategoryType } from "../@types/types";
import { getCategories } from "../services/categories";
import { useCategories } from "../hooks/useCategories";
import { string } from "prop-types";

export const CategoryContext = createContext({
  categories: [{}] as CategoryType[],
  categoriesLoading: false,
  categoriesError: null as string | null | undefined,
  getTitle: (categoryEng: string) => String(),
  refresh: () => {},
});

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>();

  let {
    categories: newCategories,
    isLoading: newIsLoading,
    error: newError,
  } = useCategories();
  useEffect(() => {
    setCategories(newCategories);
    setCategoriesLoading(newIsLoading);
    setCategoriesError(newError);
  }, [newCategories, newIsLoading, newError]);

  const getTitle = (categoryEng: string) => {
    let title = "";
    categories.forEach((category) => {
      if (category.engLink.toLowerCase() === categoryEng.toLowerCase()) {
        title = category.hebTitle;
      }
    });
    return title;
  };

  const refresh = () => {
    setCategoriesError(null);
    setCategoriesLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setCategoriesError(null);
      })
      .catch((e) => {
        setCategoriesError("Network error");
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoriesLoading,
        categoriesError,
        getTitle,
        refresh,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
