import React, { useEffect } from "react";

export const CartContext = React.createContext({
  cartItems: [""],
  cartLoading: false,
  cartError: null as string | null | undefined,
  addToCart: (productId: string) => {},
  removeFromCart: (productId: string) => {},
  refreshCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<string[]>([]);
  const [refresh, setRefresh] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState(false);
  const [cartError, setCartError] = React.useState<string | null>(null);

  const addToCart = (productId: string) => {
    const newCartItems = [...cartItems, productId];
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const removeFromCart = (productId: string) => {
    const newCartItems = cartItems.filter((item) => item !== productId);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  useEffect(() => {
    setCartError(null);
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && JSON.parse(storedCartItems)[0] != "") {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const refreshCart = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        cartError,
        addToCart,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
