import { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { StoneContext } from "../../contexts/StoneContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { addProduct } from "../../services/products";
import {
  AccordionActions,
  AccordionDetails,
  Button,
  Container,
  Grid,
  Input,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import AlertDialog from "../DeleteAlert/DeleteAlert";

type Props = {
  close: () => void;
};

const AddStone = (props: Props) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [category, setCategory] = useState<string>("");
  const [stone, setStone] = useState<string>("");
  const [images, setImages] = useState<{ preview: string[]; raw: string[] }>({
    preview: [],
    raw: [],
  });
  const productsContext = useContext(ProductsContext);
  const stoneContext = useContext(StoneContext);
  const categoryContext = useContext(CategoryContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({});

  const showAlert = (msg: string, severity: string) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const handleImageChange = (e: any) => {
    let previewImgs: string[] = [];
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        previewImgs.push(URL.createObjectURL(e.target.files[i]));
      }

      setImages({
        preview: [...previewImgs, ...images.preview],
        raw: [...e.target.files, ...images.raw],
      });
    }
    console.log(`preview: ${images.preview}`);
    console.log(`raw: ${images.raw}`);
  };

  const onRegister = async (data: ProductType) => {
    data.category = category;
    data.stone = stone;
    data.imageFileNames = [""];
    addProduct(data, images.raw)
      .then((res) => {
        //201 response
        console.log(res);
        productsContext.refresh();
        categoryContext.refresh();
        stoneContext.refresh();
        props.close();
        showAlert("Stone created successfully", "success");
      })
      .catch((e) => {
        setAlert(true);
        showAlert("There was an error creating the stone", "error");
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
                {...register("title", { required: true })}
                InputProps={{ style: { color: "white" } }}
              />

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

              {/* Price */}
              <TextField
                label="מחיר"
                type="number"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                {...register("price", { required: true })}
                fullWidth
              />

              {/* Stock */}
              <TextField
                label="מלאי"
                type="number"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                {...register("stock", { required: true })}
                fullWidth
              />

              {/* Category */}
              <TextField
                label="קטגוריה"
                value={category}
                select
                onChange={(e) => setCategory(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              >
                {categoryContext.categories.map((c) => (
                  <MenuItem
                    key={categoryContext.categories.indexOf(c)}
                    value={c.hebTitle}
                  >
                    {c.hebTitle}
                  </MenuItem>
                ))}
              </TextField>

              {/* Stone */}
              <TextField
                label="אבן"
                value={stone}
                select
                onChange={(e) => setStone(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              >
                {stoneContext.stones.map((s) => (
                  <MenuItem key={stoneContext.stones.indexOf(s)} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* String Colors */}
              <TextField
                label="צבע חוט 1 באנגלית"
                type="text"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                {...register("stringAColor", { required: true })}
                fullWidth
              />

              <TextField
                label="צבע חוט 2 באנגלית"
                type="text"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                {...register("stringBColor")}
                fullWidth
              />
            </Stack>

            {/* Images */}
            <Input
              inputProps={{ multiple: true, accept: "image/*" }}
              type="file"
              fullWidth
              onChange={handleImageChange}
              sx={{ color: "white" }}
            />
            <Container
              sx={{
                width: "100%",
                minHeight: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {images.preview && (
                <Grid
                  container
                  columns={2}
                  sx={{
                    width: "100%",
                    rowGap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  {images.preview.map((preview) => (
                    <Grid
                      item
                      key={images.preview.indexOf(preview)}
                      sx={{ width: "45%", maxHeight: "90%" }}
                    >
                      <img src={preview} alt="image" />
                    </Grid>
                  ))}
                </Grid>
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
      {alert && <AlertDialog />}
    </AccordionDetails>
  );
};

export default AddStone;
