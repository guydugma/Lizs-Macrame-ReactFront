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
} from "@mui/material";
import { Form } from "react-router-dom";
import { deleteStone, editStone } from "../../services/stones";
import { StoneContext } from "../../contexts/StoneContext";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";

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
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [zodiac, setZodiac] = useState<string>();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [stone, setStone] = useState<StoneType>(currentStone);
  const stoneContext = useContext(StoneContext);
  const deleteAlertContext = useContext(DeleteAlertContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoneType>({});

  const showAlert = (msg: string, severity: string) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const onDelete = () => {
    deleteAlertContext.setMessage(stone.name);
    deleteAlertContext.setFunc(() => () => {
      deleteStone(stone._id)
        .then((res) => {
          //201 response
          stoneContext.refresh();
          props.close();
          showAlert("Stone deleted successfully", "success");
        })
        .catch((e) => {
          showAlert("There was an error deleting the stone", "error");
        });
    });
    deleteAlertContext.toggleAlert();
  };

  const onRegister = (data: StoneType) => {
    data.zodiac = zodiac ?? "";
    data.imageFileName = "";
    editStone(stone._id, image.raw, data)
      .then((res) => {
        //201 response
        showAlert("Stone updated successfully", "success");
        stoneContext.refresh();
        props.close();
        setStone(res.data);
      })
      .catch((e) => {
        showAlert("There was an error updating the stone", "error");
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
                  label="Name"
                  type="text"
                  {...register("name", {
                    required: "This field is mandatory",
                    minLength: { value: 2, message: "Too short" },
                    maxLength: { value: 255, message: "Too long" },
                  })}
                  fullWidth
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
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
                label="Description"
                type="text"
                {...register("description", {
                  required: "This field is mandatory",
                })}
                fullWidth
                multiline
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
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
                  {image.preview && (
                    <img
                      src={image.preview}
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
      {alert && <Alert></Alert>}
    </>
  );
};

export default EditStone;
