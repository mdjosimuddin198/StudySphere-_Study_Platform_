import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../../components/shared/logo/Logo";
import {
  FaHome,
  FaCalendarAlt,
  FaStickyNote,
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaRegFileAlt,
  FaUserClock,
  FaUserCheck,
  FaUserShield,
  FaCalendarPlus,
  FaUpload,
} from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import Loading from "../../components/loading/Loading";

const Dashboard = () => {
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();

  if (isRoleLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          {/* Home */}
          <li>
            <NavLink to="/">
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          {role === "user" ? (
            <>
              {/* View Booked Session */}
              <li>
                <NavLink to="/dashboard/view_booked_session">
                  <FaCalendarAlt className="mr-2" />
                  View booked session
                </NavLink>
              </li>

              {/* Create Note */}
              <li>
                <NavLink to="/dashboard/create_note">
                  <FaStickyNote className="mr-2" />
                  Create note
                </NavLink>
              </li>

              {/* Manage Notes */}
              <li>
                <NavLink to="/dashboard/manage_notes">
                  <FaStickyNote className="mr-2" />
                  Manage notes
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
          {/* admin route  */}
          {/* View All Users */}

          {isAdmin ? (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/view_all_users">
                  <FaUsers className="mr-2" />
                  View all users (a)
                </NavLink>
              </li>
              {/* manage_admins */}
              <li>
                <NavLink to="/dashboard/manage_admins">
                  <FaUserShield className="mr-2" />
                  Manage Admins (a)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/active_tutors">
                  <FaUserCheck className="mr-2" /> Active Tutors (a)
                </NavLink>
              </li>
              {/* Pending Tutors */}
              <li>
                <NavLink to="/dashboard/pending_tutors">
                  <FaUserClock className="mr-2" />
                  Pending tutors (a)
                </NavLink>
              </li>
              {/* View All Study Sessions */}
              <li>
                <NavLink to="/dashboard/all_pending_sessions">
                  <FaChalkboardTeacher className="mr-2" />
                  View all study sessions (a)
                </NavLink>
              </li>
              {/* View All Materials */}
              <li>
                <NavLink to="/dashboard/view_all_materials">
                  <FaRegFileAlt className="mr-2" />
                  View all materials (a)
                </NavLink>
              </li>
            </>
          ) : (
            " "
          )}

          {isTutor ? (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/create_study_session">
                  <FaCalendarPlus className="mr-2" />
                  Create Study Session (t)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved_session">
                  <FaCalendarPlus className="mr-2" />
                  Approved Session(t)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upload_materials">
                  <FaUpload className="mr-2" />
                  Upload Materials (t)
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
