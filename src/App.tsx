import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  });

  return <RouterProvider router={router} />;
}

export default App;
