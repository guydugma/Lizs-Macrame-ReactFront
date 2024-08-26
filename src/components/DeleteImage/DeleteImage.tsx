import { Container, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  image: string;
  func: () => void;
};

const DeleteImage = (props: Props) => {
  return (
    <Container>
      <IconButton sx={{ position: "absolute" }} onClick={props.func}>
        <CancelIcon
          sx={{ color: "black", bgcolor: "white", borderRadius: "50%" }}
        />
      </IconButton>
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/public/products/${
          props.image
        }`}
        onClick={props.func}
      />
    </Container>
  );
};

export default DeleteImage;
