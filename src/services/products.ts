import axios from "axios";
import { ProductType } from "../@types/types";

export const productsUrl = `${import.meta.env.VITE_SERVER_URL}/api/products`;

export const getProducts = () => {
  return axios.get(productsUrl);
};

export const getProduct = (id: string) => {
  return axios.get(`${productsUrl}/${id}`);
};

export const addProduct = (product: ProductType, images: string[]) => {
  let formData = new FormData();
  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });
  return axios.post(productsUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editProduct = (
  productId: string,
  product: any,
  images: string[]
) => {
  let formData = new FormData();
  formData.append("product", JSON.stringify(product));
  images.forEach((image) => {
    formData.append("images", image);
  });
  return axios.put(`${productsUrl}/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (productId: string) => {
  return axios.delete(`${productsUrl}/${productId}`);
};
