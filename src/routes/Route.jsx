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

export const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement : <Errorpage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availablefoods",
        element: <Availablefoods/>,
      },
      {
        path: "/addfood",
        element: <Addfood/>,
      },
      {
        path: "/managemyfoods",
        element: <Managemyfoods/>,
      },
      {
        path: "/myfoodrequest",
        element: <Myfoodrequest/>,
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
