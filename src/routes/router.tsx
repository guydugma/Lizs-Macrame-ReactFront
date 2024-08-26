import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "./Home";
import Categories from "./Categories";
import Stones from "./Stones";
import ProductPage from "./ProductPage";
import Manage from "./Manage";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import CategoryPage from "./CategoryPage.tsx";
import About from "./About.tsx";
import CartPage from "./CartPage.tsx";
// import Error from "./Error.tsx";

// import Profile from "./Profile.tsx";
import { baseUrl } from "../services/auth";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Root />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories", element: <Categories /> },
      { path: "/stones", element: <Stones /> },
      { path: "/products/:id", element: <ProductPage /> },
      { path: "/manage", element: <Manage /> },
      { path: "/categories/:category", element: <CategoryPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      // { path: "/cards", element: <Cards /> },
      // { path: "/cards/:id", element: <CardPage /> },
      // { path: "/favorites", element: <Favorites /> },
      // { path: "/mycards", element: <MyCards /> },
      { path: "/about", element: <About /> },
      // {
      //   path: "/createcard",
      //   element: (
      //     <CreateCard />
      //   ),
      // },
      // {
      //   path: "/profile",
      //   element: (
      //     <Profile />
      //   ),
      // },
    ],
  },
]);
