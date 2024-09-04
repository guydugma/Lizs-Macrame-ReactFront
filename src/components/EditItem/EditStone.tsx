import { CategoryType, StoneType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { editCategory } from "../../services/categories";
import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import {
  AccordionActions,
  AccordionDetails,
  Button,
  Container,
  Input,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "react-router-dom";
import { deleteStone, editStone } from "../../services/stones";
import { StoneContext } from "../../contexts/StoneContext";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";
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
  stone: StoneType;
  close: () => void;
};

const EditStone = (props: Props) => {
  let currentStone = props.stone;
  const [zodiac, setZodiac] = useState<string>();
  const [image, setImage] = useState<{ preview: string; raw: string }>();
  const [stone, setStone] = useState<StoneType>(currentStone);
  const stoneContext = useContext(StoneContext);
  const deleteAlertContext = useContext(DeleteAlertContext);
  const { setAlert } = useContext(AlertContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoneType>({});

  const onDelete = () => {
    deleteAlertContext.setMessage(stone.name);
    deleteAlertContext.setFunc(() => () => {
      deleteStone(stone._id)
        .then((res) => {
          //201 response
          stoneContext.refresh();
          props.close();
          setAlert("האבן נמחקה בהצלחה", "success");
        })
        .catch((e) => {
          setAlert("הייתה בעיה במחיקת האבן", "error");
        });
    });
    deleteAlertContext.toggleAlert();
  };

  const onRegister = (data: StoneType) => {
    data.zodiac = zodiac ?? "";
    data.imageFileName = image?.raw ?? stone.imageFileName;
    editStone(stone._id, data, image?.raw)
      .then((res) => {
        //201 response
        setAlert("האבן עודכנה בהצלחה", "success");
        stoneContext.refresh();
        props.close();
        setStone(res.data);
      })
      .catch((e) => {
        setAlert("הייתה בעיה בעדכון האבן", "error");
      });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <>
      <AccordionDetails
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Form onSubmit={handleSubmit(onRegister)} className="w-full">
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
                {/* Name */}
                <TextField
                  defaultValue={stone.name}
                  placeholder={stone.name}
                  label="שם"
                  type="text"
                  {...register("name", {
                    required: "This field is mandatory",
                    minLength: { value: 2, message: "Too short" },
                    maxLength: { value: 255, message: "Too long" },
                  })}
                  fullWidth
                />
                {errors.name && (
                  <Typography variant="body1" color={"error"}>
                    {errors.name.message}
                  </Typography>
                )}

                {/* Zodiac */}
                <TextField
                  label="מזל"
                  value={zodiac ?? currentStone.zodiac}
                  select
                  onChange={(e) => setZodiac(e.target.value)}
                  sx={{
                    "& .MuiList-root": {
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
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
                defaultValue={stone.description}
                placeholder={stone.description}
                label="תיאור"
                type="text"
                {...register("description", {
                  required: "This field is mandatory",
                })}
                fullWidth
                multiline
              />
              {errors.description && (
                <Typography variant="body1" color={"error"}>
                  {errors.description.message}
                </Typography>
              )}

              {/* Image */}
              <Stack sx={{ gap: 2 }}>
                <Container sx={{ width: "300px", maxHeight: "200px" }}>
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/public/stones/${
                      stone.imageFileName
                    }`}
                    alt={stone.name}
                    className="w-full h-full object-contain"
                  />
                </Container>

                <Container
                  sx={{
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {image?.preview && (
                    <img
                      src={image?.preview}
                      alt="image"
                      className="w-full h-full object-contain"
                    />
                  )}
                </Container>
                <Input type="file" fullWidth onChange={handleImageChange} />
              </Stack>
            </Stack>
            <AccordionActions
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                color="success"
                sx={{ width: "40%" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                type="button"
                sx={{ width: "40%" }}
                onClick={onDelete}
              >
                Delete
              </Button>
            </AccordionActions>
          </Stack>
        </Form>
      </AccordionDetails>
    </>
  );
};

export default EditStone;
