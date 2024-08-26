import { useEffect, useState } from "react";
import { ProductType } from "../@types/types";
import { getProducts, getProduct } from "../services/products";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, error };
};

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    getProduct(productId)
      .then((res) => {
        setProduct(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { product, isLoading, error };
};
