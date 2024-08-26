import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const themeOptions: ThemeOptions = {
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#c9af9e",
    },

    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#bda39a",
    },

    background: {
      default: "white",
      paper: "#d7ccc8",
    },
    text: {
      primary: "#4E342E",
      secondary: "#8d6e63",
    },
    info: {
      main: "#558b2f",
    },
  },
};

const theme = createTheme(themeOptions);

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CacheProvider value={cacheRtl}>
      {" "}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};
