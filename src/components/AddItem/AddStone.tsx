import {
  AccordionActions,
  AccordionDetails,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Input,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { CategoryType, StoneType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { addCategory } from "../../services/categories";
import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import AlertDialog from "../DeleteAlert/DeleteAlert";
import { AuthContext } from "../../contexts/AuthContext";
import { addStone } from "../../services/stones";
import Menu from "@mui/material/Menu";
import "./AddStone.scss";
import { Style } from "@mui/icons-material";
import { StoneContext } from "../../contexts/StoneContext";
import { AlertContext } from "../../contexts/AlertContext";

const zodiacs = [
  "מאזניים",
  "עקרב",
  "קשת",
  "גדי",
  "דלי",
  "דגים",
  "טלה",
  "שור",
  "תאומים",
  "סרטן",
  "אריה",
  "בתולה",
];

type Props = {
  close: () => void;
};

const AddStone = (props: Props) => {
  const { setAlert } = useContext(AlertContext);
  const [zodiac, setZodiac] = useState<string>("");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const stoneContext = useContext(StoneContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoneType>({});

  const handleImageChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const onRegister = async (data: StoneType) => {
    data.zodiac = zodiac;
    data.imageFileName = "";
    console.log(data);
    addStone(data, image.raw)
      .then((res) => {
        //201 response
        console.log(res);
        stoneContext.refresh();
        setAlert("האבן נוספה בהצלחה", "success");
        props.close();
      })
      .catch((e) => {
        setAlert("הייתה בעיה בהוספת האבן", "error");
      });
  };

  return (
    <AccordionDetails
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& *": { color: "white", direction: "rtl" },
      }}
    >
      <Form
        onSubmit={handleSubmit(onRegister)}
        className="w-full justify-around"
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: "100%", justifyContent: "space-around" }}
        >
          <Stack
            spacing={2}
            direction="column"
            sx={{
              width: "100%",
              justifyContent: "space-around",
              gap: 2,
              color: "white",
            }}
          >
            <Stack sx={{ gap: 2, color: "white" }}>
              {/* name */}
              <TextField
                label="שם"
                type="text"
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                {...register("name", { required: true })}
                InputProps={{ style: { color: "white" } }}
              />

              {/* Zodiac */}
              <TextField
                label="מזל"
                value={zodiac}
                select
                onChange={(e) => setZodiac(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              >
                {zodiacs.map((z) => (
                  <MenuItem key={zodiacs.indexOf(z)} value={z}>
                    {z}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Description */}
            <TextField
              minRows={4}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              label="תיאור"
              type="text"
              {...register("description", {
                required: "This field is mandatory",
              })}
              fullWidth
              multiline
            />

            {/* Image */}
            <Input
              type="file"
              fullWidth
              onChange={handleImageChange}
              sx={{ color: "white" }}
            />
            <Container
              sx={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image.preview && (
                <img
                  src={image.preview}
                  alt="image"
                  style={{ height: "100%" }}
                />
              )}
            </Container>
          </Stack>
          <AccordionActions
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              type="submit"
              color="success"
            >
              Save
            </Button>
          </AccordionActions>
        </Stack>
      </Form>
    </AccordionDetails>
  );
};

export default AddStone;
