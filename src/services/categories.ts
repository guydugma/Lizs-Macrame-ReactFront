import axios from "axios";
import { CategoryType } from "../@types/types";

export const categoriesUrl = `${
  import.meta.env.VITE_SERVER_URL
}/api/categories`;

export const getCategories = () => axios.get(categoriesUrl);

export const editCategory = (id: string, category: CategoryType) =>
  axios.put(`${categoriesUrl}/${id}`, category, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

export const addCategory = (data: CategoryType) =>
  axios.post(categoriesUrl, data, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

export const deleteCategory = (id: string) =>
  axios.delete(`${categoriesUrl}/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
