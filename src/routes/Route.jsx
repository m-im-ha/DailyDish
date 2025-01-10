import { createBrowserRouter } from "react-router-dom";
import Applayout from "../layout/Applayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Errorpage from "../pages/Errorpage";
import Availablefoods from "../components/Availablefoods";
import Addfood from "../pages/Addfood";
import Managemyfoods from "../components/Managemyfoods";
import Myfoodrequest from "../components/Myfoodrequest";
import PrivateRoute from "./PrivateRoute";
import FoodDetailsCard from "../components/FoodDetailsCard";
import MyProfile from "../components/MyProfile";
import Categories from "../components/Categories";

export const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availablefoods",
        element: <Availablefoods />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/addfood",
        element: (
          <PrivateRoute>
            <Addfood />
          </PrivateRoute>
        ),
      },
      {
        path: "/managemyfoods",
        element: (
          <PrivateRoute>
            <Managemyfoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/myfoodrequest",
        element: (
          <PrivateRoute>
            <Myfoodrequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: <FoodDetailsCard />,
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
