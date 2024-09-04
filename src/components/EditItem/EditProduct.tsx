import { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { StoneContext } from "../../contexts/StoneContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductType } from "../../@types/types";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { deleteProduct, editProduct } from "../../services/products";
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
import DeleteImage from "../DeleteImage/DeleteImage";
import { DeleteAlertContext } from "../../contexts/DeleteAlertContext";
import { AlertContext } from "../../contexts/AlertContext";

type Props = {
  product: ProductType;
  close: () => void;
};

const AddStone = (props: Props) => {
  const currentProduct = props.product;
  const [currentImages, setCurrentImages] = useState<string[]>(
    currentProduct.imageFileNames
  );
  const [category, setCategory] = useState<string>(currentProduct.category);
  const [stone, setStone] = useState<string>(currentProduct.stone);
  const [images, setImages] = useState<{ preview: string[]; raw: string[] }>({
    preview: [],
    raw: [],
  });
  const productsContext = useContext(ProductsContext);
  const stoneContext = useContext(StoneContext);
  const categoryContext = useContext(CategoryContext);
  const deleteAlertContext = useContext(DeleteAlertContext);
  const { setAlert } = useContext(AlertContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({});

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
  };

  const onDelete = () => {
    deleteAlertContext.setMessage(props.product.title);
    deleteAlertContext.setFunc(() => () => {
      deleteProduct(currentProduct._id)
        .then((res) => {
          //201 response
          productsContext.refresh();
          props.close();
          setAlert("המוצר נמחק בהצלחה", "success");
        })
        .catch((e) => {
          setAlert("הייתה בעיה במחיקת המוצר", "error");
        });
    });
    deleteAlertContext.toggleAlert();
  };

  const onRegister = async (data: ProductType) => {
    data.category = category;
    data.stone = stone;
    data.imageFileNames = currentImages;
    editProduct(currentProduct._id, data, images.raw)
      .then((res) => {
        //201 response
        console.log(res);
        productsContext.refresh();
        props.close();
        setAlert("המוצר עודכן בהצלחה", "success");
      })
      .catch((e) => {
        setAlert("הייתה בעיה בעדכון המוצר", "error");
      });
  };

  const deleteImage = (fileName: string) => {
    const index = currentImages.indexOf(fileName);
    if (index !== -1) {
      currentImages.splice(index, 1);
      setCurrentImages([...currentImages]);
    }
  };

  return (
    <AccordionDetails
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& *": { direction: "rtl" },
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
            }}
          >
            <Stack sx={{ gap: 2 }}>
              {/* name */}
              <TextField
                label="שם"
                type="text"
                defaultValue={currentProduct.title}
                fullWidth
                {...register("title", { required: true })}
              />

              {/* Description */}
              <TextField
                minRows={4}
                label="תיאור"
                type="text"
                defaultValue={currentProduct.description}
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
                defaultValue={currentProduct.price}
                {...register("price", { required: true })}
                fullWidth
              />

              {/* Stock */}
              <TextField
                label="מלאי"
                type="number"
                defaultValue={currentProduct.stock}
                {...register("stock", { required: true })}
                fullWidth
              />

              {/* Category */}
              <TextField
                label="קטגוריה"
                value={category}
                select
                onChange={(e) => setCategory(e.target.value)}
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
                defaultValue={currentProduct.stringAColor}
                {...register("stringAColor", { required: true })}
                fullWidth
              />

              <TextField
                label="צבע חוט 2 באנגלית"
                type="text"
                defaultValue={currentProduct.stringBColor}
                {...register("stringBColor")}
                fullWidth
              />
            </Stack>

            {/* Delete Image */}
            {currentImages.length > 0 && (
              <Container
                sx={{
                  width: "100%",
                  minHeight: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  columns={2}
                  sx={{
                    width: "100%",
                    rowGap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  {currentImages.map((image) => (
                    <Grid
                      item
                      key={currentImages.indexOf(image)}
                      sx={{ width: "45%", maxHeight: "90%" }}
                    >
                      <DeleteImage
                        image={image}
                        func={() => deleteImage(image)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}

            {/*Add Images */}
            <Input
              inputProps={{ multiple: true, accept: "image/*" }}
              type="file"
              fullWidth
              onChange={handleImageChange}
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
              sx={{ width: "40%" }}
              variant="contained"
              type="submit"
              color="success"
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
  );
};

export default AddStone;
