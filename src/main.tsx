import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CustomThemeProvider } from "./contexts/CustomThemeContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { ScrollContextProvider } from "./contexts/ScrollContext.tsx";
import { DeleteAlertProvider } from "./contexts/DeleteAlertContext.tsx";
import { StoneContextProvider } from "./contexts/StoneContext.tsx";
import { CategoryContextProvider } from "./contexts/CategoryContext.tsx";
import { ProductsContextProvider } from "./contexts/ProductsContext.tsx";
import FilterContextProvider from "./contexts/FilterContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ScrollContextProvider>
      <DeleteAlertProvider>
        <AlertProvider>
          <AuthContextProvider>
            <CustomThemeProvider>
              <CategoryContextProvider>
                <StoneContextProvider>
                  <ProductsContextProvider>
                    <FilterContextProvider>
                      <CartProvider>
                        <App />
                      </CartProvider>
                    </FilterContextProvider>
                  </ProductsContextProvider>
                </StoneContextProvider>
              </CategoryContextProvider>
            </CustomThemeProvider>
          </AuthContextProvider>
        </AlertProvider>
      </DeleteAlertProvider>
    </ScrollContextProvider>
  </React.StrictMode>
);
