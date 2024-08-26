import { createContext, useEffect, useState } from "react";
import { ProductType } from "../@types/types";
import { getProducts } from "../services/products";
import { useProducts } from "../hooks/useProducts";

export const ProductsContext = createContext({
  products: [{}] as ProductType[],
  productsLoading: false,
  productsError: null as string | null | undefined,
  refresh: () => {},
  getProductById: (id: string) => {
    return {} as ProductType | undefined;
  },
});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>();

  let {
    products: newProducts,
    isLoading: newIsLoading,
    error: newError,
  } = useProducts();
  useEffect(() => {
    setProducts(newProducts);
    setProductsLoading(newIsLoading);
    setProductsError(newError);
  }, [newProducts, newIsLoading, newError]);

  const refresh = () => {
    setProductsError(null);
    setProductsLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setProductsError(null);
      })
      .catch((e) => {
        setProductsError("Network error");
      })
      .finally(() => {
        setProductsLoading(false);
      });
  };

  const getProductById = (id: string) => {
    return products.find((product) => product._id === id) ?? undefined;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        refresh,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
