import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layouts/RootLayOut";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Clubs from "../Pages/Clubs";
import Events from "../Pages/Events";
import AuthLayout from "../Layouts/AuthLayout";
import BeAManager from "../Pages/BeAManager";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/clubs",
        element: <Clubs></Clubs>,
      },
      {
        path: "/events",
        element: <Events></Events>,
      },
      {
        path: "/be-a-manager",
        element: (
          <PrivateRoute>
            <BeAManager></BeAManager>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [],
  },
]);
