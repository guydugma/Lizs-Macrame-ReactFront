import { useForm } from "react-hook-form";
import { RegisterUser } from "../@types/types";
import patterns from "../validation/patterns";
import { DevTool } from "@hookform/devtools";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { registerMock } from "../mocks/register";
import auth from "../services/auth";
import dialogs from "../ui/dialogs";
import { Form, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import "./Register.scss";
import { themeOptions } from "../contexts/CustomThemeContext";

const Register = () => {
  const theme = themeOptions;
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    defaultValues: registerMock,
  });
  const [showPassword, setShowPassword] = useState(false);

  const onRegister = (data: RegisterUser) => {
    auth
      .register(data) //request
      .then((res) => {
        //201 response
        localStorage.setItem("user_id", res.data._id);
        dialogs.success("Success", "Register").then(() => {
          navigate("/login");
        });
      })
      .catch((e) => {
        dialogs.error("Error", e.response.data.message);
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        mb: 2,
      }}
    >
      <Typography variant="h3">הרשמה</Typography>
      <Form
        noValidate
        onSubmit={handleSubmit(onRegister)}
        className="register-form"
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: "100%",
          }}
        >
          {/* firstName */}
          <section>
            <TextField
              fullWidth
              label="שם פרטי"
              type="text"
              {...register("name.first", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.name?.last && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.name?.first?.message}
              </Typography>
            )}
          </section>

          {/* last */}
          <section>
            <TextField
              fullWidth
              label="שם משפחה"
              type="text"
              {...register("name.last", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.name?.last && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.name?.last?.message}
              </Typography>
            )}
          </section>

          {/* phone */}
          <section>
            <TextField
              fullWidth
              label="מספר טלפון"
              type="tel"
              {...register("phone", {
                required: "This field is mandatory",
                minLength: { value: 9, message: "Too short" },
                maxLength: { value: 14, message: "Too long" },
                pattern: {
                  value: patterns.phone,
                  message: "מספר טלפון לא תקין",
                },
              })}
            />
            {errors.phone && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.phone?.message}
              </Typography>
            )}
          </section>

          {/* email */}
          <section>
            <TextField
              fullWidth
              label="אימייל"
              type="email"
              {...register("email", {
                required: "This field is mandatory",
                pattern: {
                  value: patterns.email,
                  message: "אימייל לא תקין",
                },
              })}
            />
            {errors.email && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.email?.message}
              </Typography>
            )}
          </section>

          {/* password */}
          <section>
            <Box className="password-container w-full">
              <TextField
                fullWidth
                label="סיסמה"
                InputProps={{
                  endAdornment: (
                    <Button
                      type="button"
                      onClick={() => {
                        setShowPassword((s) => !s);
                      }}
                    >
                      {showPassword ? <BsEyeSlashFill /> : <BsEye />}
                    </Button>
                  ),
                }}
                type={showPassword ? `text` : `password`}
                {...register("password", {
                  required: "This field is mandatory",
                  pattern: {
                    value: patterns.password,
                    message:
                      "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                  },
                })}
              />
            </Box>
            {errors.password && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.password?.message}
              </Typography>
            )}
          </section>

          {/* address.country */}
          <section>
            <TextField
              fullWidth
              label="מדינה"
              type="text"
              {...register("address.country", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.country && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.address?.country?.message}
              </Typography>
            )}
          </section>

          {/* address.city */}
          <section>
            <TextField
              fullWidth
              label="עיר"
              type="text"
              {...register("address.city", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.city && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.address?.city?.message}
              </Typography>
            )}
          </section>

          {/* address.street */}
          <section>
            <TextField
              fullWidth
              label="רחוב"
              type="text"
              {...register("address.street", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.street && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.address?.street?.message}
              </Typography>
            )}
          </section>

          {/* address.houseNumber */}
          <section>
            <TextField
              fullWidth
              label="מספר בית"
              type="number"
              {...register("address.houseNumber", {
                required: "This field is mandatory",
                min: { value: 2, message: "Too small" },
                max: { value: 256, message: "Too big" },
              })}
            />
            {errors.address?.houseNumber && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.address?.houseNumber?.message}
              </Typography>
            )}
          </section>

          {/* address.zip */}
          <section>
            <TextField
              fullWidth
              label="מיקוד"
              type="string"
              {...register("address.zip", {
                required: "This field is mandatory",
                min: { value: 2, message: "Too small" },
                max: { value: 256, message: "Too big" },
              })}
            />
            {errors.address?.zip && (
              <Typography
                variant="body1"
                color={"error"}
                className="text-red-500"
              >
                {errors.address?.zip?.message}
              </Typography>
            )}
          </section>

          {/* isAdmin */}
          <section>
            <FormControlLabel
              control={<Checkbox />}
              label="אדמין"
              {...register("isAdmin")}
            />
          </section>

          <Button type="submit" variant="contained">
            הרשמה
          </Button>
        </Stack>
      </Form>
      {/* <DevTool control={control} /> */}
    </Container>
  );
};

export default Register;
