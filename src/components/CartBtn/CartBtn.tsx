import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Badge } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartBtn = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Badge
      badgeContent={cartContext.cartItems.length}
      sx={{
        "&:hover": { cursor: "pointer" },
        padding: 1.5,
      }}
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <ShoppingBagIcon onClick={() => navigate("/cart")} />
    </Badge>
  );
};

export default CartBtn;
