import { Button, Container } from "@mui/material";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

type Props = {
  productId: string;
};

const AddToCartBtn = (props: Props) => {
  const cartContext = useContext(CartContext);
  const productId = props.productId;

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      {!cartContext.cartItems.includes(productId) ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            cartContext.addToCart(productId);
          }}
          sx={{ width: "50%" }}
        >
          הוספה לעגלה
        </Button>
      ) : (
        <Button variant="contained" disabled sx={{ width: "50%" }}>
          בעגלה
        </Button>
      )}
    </Container>
  );
};

export default AddToCartBtn;
