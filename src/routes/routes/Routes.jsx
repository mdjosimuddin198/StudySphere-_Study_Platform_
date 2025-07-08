import React from "react";
import { createBrowserRouter } from "react-router";
import Mainlayouts from "../../layouts/mainlayouts/Mainlayouts";
import SignUp from "../../pages/signUp/SignUp";
import LogIn from "../../pages/logIn/LogIn";
import Home from "../../components/home/Home";
import AboutUS from "../../pages/about/AboutUS";
import PrivetRoutes from "../privetRotes/PrivetRoutes";
import BeATutor from "../../pages/beATutor/BeATutor";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayouts,
    children: [
      { index: true, Component: Home },
      {
        path: "be_a_tutor",
        element: (
          <PrivetRoutes>
            <BeATutor></BeATutor>
          </PrivetRoutes>
        ),
      },
      {
        path: "about_us",
        Component: AboutUS,
      },
      {
        path: "sign_up",
        Component: SignUp,
      },
      {
        path: "log_in",
        Component: LogIn,
      },
    ],
  },
]);

export default Routes;
