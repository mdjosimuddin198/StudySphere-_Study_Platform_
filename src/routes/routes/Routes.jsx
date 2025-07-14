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
import StudySessionsList from "../../pages/studySessions/StudySessionsList";
import StudySessionsDetails from "../../pages/studySessions/StudySessionsDetails";
import MyBookedSessions from "../../layouts/dashboard/bookedSession/MyBookedSessions";
import BookedSessionList from "../../layouts/dashboard/bookedSession/BookedSessionList";
import Payment from "../../pages/payment/Payment";
import Tutor from "../../pages/tutor/Tutor";
import MyStudySessions from "../../pages/tutorSession/MyStudySessions";
import TutorRoute from "../tutorRoute/TutorRoute";
import AllUsers from "../../layouts/dashboard/allUsers/AllUsers";
import StudentRoute from "../studentRoute/StudentRoute";
import CreateNote from "../../pages/createNote/CreateNote";
import MyNotes from "../../pages/myNotes/MyNotes";

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
            <StudentRoute>
              <BeATutor></BeATutor>
            </StudentRoute>
          </PrivetRoutes>
        ),
      },
      {
        path: "study_session",
        element: <StudySessionsList></StudySessionsList>,
      },

      {
        path: "study_session/:id",
        element: (
          <PrivetRoutes>
            <StudySessionsDetails></StudySessionsDetails>
          </PrivetRoutes>
        ),
      },

      {
        path: "booked_session/:id",
        element: (
          <PrivetRoutes>
            <StudentRoute>
              <BookedSessionList></BookedSessionList>
            </StudentRoute>
          </PrivetRoutes>
        ),
      },
      {
        path: "all_tutor",
        Component: Tutor,
      },
      {
        path: "payment/:id",
        element: (
          <PrivetRoutes>
            <StudentRoute>
              <Payment></Payment>
            </StudentRoute>
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
      // studern routes
      {
        path: "view_booked_session",
        element: (
          <StudentRoute>
            <MyBookedSessions></MyBookedSessions>
          </StudentRoute>
        ),
      },
      {
        path: "create_note",
        element: (
          <StudentRoute>
            <CreateNote></CreateNote>
          </StudentRoute>
        ),
      },
      {
        path: "manage_notes",
        element: (
          <StudentRoute>
            <MyNotes></MyNotes>
          </StudentRoute>
        ),
      },
      // addmin route
      {
        path: "view_all_users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
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
        element: (
          <TutorRoute>
            <CreateStudySession></CreateStudySession>
          </TutorRoute>
        ),
      },
      {
        path: "approved_session",
        element: (
          <TutorRoute>
            <MyStudySessions></MyStudySessions>
          </TutorRoute>
        ),
      },
    ],
  },
]);

export default Routes;
