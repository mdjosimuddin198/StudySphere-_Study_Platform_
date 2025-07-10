import React from "react";
import { createBrowserRouter } from "react-router";
import Mainlayouts from "../../layouts/mainlayouts/Mainlayouts";
import SignUp from "../../pages/signUp/SignUp";
import LogIn from "../../pages/logIn/LogIn";
import Home from "../../components/home/Home";
import AboutUS from "../../pages/about/AboutUS";
import PrivetRoutes from "../privetRotes/PrivetRoutes";
import BeATutor from "../../pages/beATutor/BeATutor";
import Dashboard from "../../layouts/dashboard/Dashboard";
import PendingTutor from "../../layouts/dashboard/pendingTutor/PendingTutor";
import ActiveTutor from "../../layouts/dashboard/activeTutor/ActiveTutor";
import ManageAdmins from "../../layouts/dashboard/ManageAdmins/ManageAdmins";
import Forbidden from "../../pages/forbidden/Forbidden";
import AdminRoute from "../AdminRoute/AdminRoute";
import CreateStudySession from "../../pages/createStudySession/CreateStudySession";
import PendingSessionsTable from "../../layouts/dashboard/ManageAdmins/pendingSessionsTable/PendingSessionsTable";

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
        path: "forbidden",
        Component: Forbidden,
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
  {
    path: "dashboard",
    element: (
      <PrivetRoutes>
        <Dashboard></Dashboard>
      </PrivetRoutes>
    ),
    children: [
      {
        path: "pending_tutors",
        element: (
          <AdminRoute>
            <PendingTutor></PendingTutor>
          </AdminRoute>
        ),
      },
      {
        path: "active_tutors",
        element: (
          <AdminRoute>
            <ActiveTutor></ActiveTutor>
          </AdminRoute>
        ),
      },
      {
        path: "manage_admins",
        element: (
          <AdminRoute>
            <ManageAdmins></ManageAdmins>
          </AdminRoute>
        ),
      },
      {
        path: "all_pending_sessions",
        element: (
          <AdminRoute>
            <PendingSessionsTable></PendingSessionsTable>
          </AdminRoute>
        ),
      },
      // tutor route
      {
        path: "create_study_session",
        element: <CreateStudySession></CreateStudySession>,
      },
    ],
  },
]);

export default Routes;
