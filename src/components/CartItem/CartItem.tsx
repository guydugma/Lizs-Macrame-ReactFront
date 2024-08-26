import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ProductType } from "../../@types/types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  product: ProductType;
  refresh: () => void;
};

const CartItem = (props: Props) => {
  const product = props.product;
  const refresh = props.refresh;
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  return (
    <ListItem key={product._id}>
      <ListItemButton onClick={() => navigate(`/products/${product._id}`)}>
        <ListItemAvatar>
          <Avatar
            src={`${import.meta.env.VITE_SERVER_URL}/public/products/${
              product.imageFileNames[0]
            }`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={product.title}
          sx={{
            width: "50%",
            wordBreak: "break-word",
            paddingRight: 1,
          }}
        />
        <ListItemText primary={product.price + " ₪"} />
      </ListItemButton>
      <IconButton
        onClick={() => {
          cartContext.removeFromCart(product._id);
          refresh();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
