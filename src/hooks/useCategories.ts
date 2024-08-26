import { useEffect, useState } from "react";
import { CategoryType } from "../@types/types";
import { getCategories } from "../services/categories";



export const useCategories = () => {

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect( () => {
    setError(null);
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { categories, isLoading, error };
};