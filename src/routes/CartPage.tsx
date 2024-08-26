import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  setRef,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { ProductType } from "../@types/types";
import { ProductsContext } from "../contexts/ProductsContext";

import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";

const CartPage = () => {
  const cartContext = useContext(CartContext);
  const productsContext = useContext(ProductsContext);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const items: ProductType[] = [];
    cartContext.cartItems.forEach((productId) => {
      const item = productsContext.getProductById(productId);
      if (item != undefined) {
        items.push(item);
      } else {
        cartContext.removeFromCart(productId);
      }
    });
    setCartProducts(items);
  }, [productsContext.products, refresh]);

  useEffect(() => {
    const items: ProductType[] = [];
    cartContext.cartItems.forEach((productId) => {
      const item = productsContext.getProductById(productId);
      if (item != undefined) {
        items.push(item);
      } else {
        cartContext.removeFromCart(productId);
      }
    });
    setCartProducts(items);
  }, []);

  const refreshCart = () => {
    setRefresh(!refresh);
  };

  const totalSum = () => {
    let sum = 0;
    cartProducts.forEach((product) => {
      sum += product.price;
    });
    return sum;
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="h3">העגלה שלי</Typography>
      {productsContext.productsLoading && <p>Loading...</p>}
      {productsContext.productsError && <p>{cartContext.cartError}</p>}
      <List sx={{ alignItems: "center" }}>
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <>
              <CartItem
                key={cartProducts.indexOf(product)}
                product={product}
                refresh={refreshCart}
              />
              <Divider
                variant="fullWidth"
                component="li"
                sx={{
                  height: "10px",
                  width: "100%",
                }}
              />
            </>
          ))
        ) : (
          <Typography>העגלה ריקה</Typography>
        )}

        <ListItem sx={{ justifyContent: "space-around" }}>
          <Typography>סה"כ: </Typography>
          <Typography>{totalSum() + " ₪"}</Typography>
        </ListItem>
      </List>
    </Container>
  );
};

export default CartPage;
