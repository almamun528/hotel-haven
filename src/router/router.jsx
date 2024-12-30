import { createBrowserRouter } from "react-router-dom";
import Layout from "../LayOut/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Hotels from "../Pages/Hotels";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "hotels",
        element: <Hotels />,
      },
    ],
  },
]);
export default router;
