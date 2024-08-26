import { useForm } from "react-hook-form";
import { LoginUser } from "../@types/types";

import auth from "../services/auth";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import patterns from "../validation/patterns";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onLogin = (data: LoginUser) => {
    auth
      .login(data)
      .then((res) => {
        showSuccessDialog("Login", "Logged in").then(() => {
          login(res.data);
          // send the user to home page
          navigate("/");
        });
      })
      .catch((e) => {
        dialogs.error("Login Error", e.response.data);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        התחברות
      </Typography>
      <form noValidate onSubmit={handleSubmit(onLogin)}>
        {/* email */}
        <Stack sx={{ gap: 2, width: "100%" }}>
          <TextField
            fullWidth
            placeholder="Email"
            autoCapitalize="true"
            autoCorrect="false"
            autoComplete="email"
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: patterns.email,
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}

          {/* password */}

          <TextField
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This field is mandatory",
              pattern: patterns.password,
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
      <Button onClick={() => navigate("/register")}>
        <Typography variant="body1">הרשמו עכשיו</Typography>
      </Button>
    </Container>
  );
};

export default Login;
