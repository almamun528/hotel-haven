import { createBrowserRouter } from "react-router-dom";
import Layout from "../LayOut/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Hotels from "../Pages/Hotels";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details";
import MyBooking from "../Pages/MyBooking";
import Error from "../Components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
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
      {
        path: "hotels/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://hotel-server-chi.vercel.app/hotels/${params.id}`),
      },
      {
        path: "myBooking/",
        element: (
          <PrivateRoute>
            {" "}
            <MyBooking />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
