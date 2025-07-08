import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Logo from "../logo/Logo";

const drawerId = "my-drawer-4";
const Navbar = () => {
  const { logedInuser, setLogedInUser, logOutUser } = useAuth();

  // const handleLogOutUser = () => {
  //   logOutUser()
  //     .then(() => {
  //       toast.success("logOut successFully");
  //     })
  //     .catch((error) => {
  //       toast.error(error?.message);
  //     });
  // };

  const handleLogOutUser = async () => {
    try {
      // 1️⃣ Firebase থেকে লগআউট
      await logOutUser();

      // 2️⃣ Express এ কল দিয়ে কুকিতে থাকা টোকেনও clear করো
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setLogedInUser(null);
      toast.success("Log Out Successfully");
    } catch (error) {
      console.error(error);
      toast.error("error found.");
    }
  };

  const links = (
    <>
      <NavLink className="ml-4" to="/">
        HOME
      </NavLink>
      <NavLink className="ml-4" to="/be_a_tutor">
        Be A Tutor
      </NavLink>

      <NavLink className="ml-4" to="/dashboard">
        DASHBOARD
      </NavLink>

      <NavLink className="ml-4" to="/about_us">
        ABOUT US
      </NavLink>
    </>
  );
  return (
    <>
      <div className="navbar bg-gray-700 my-6 rounded-2xl border-2 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end z-50">
          {logedInuser ? (
            <div className="relative">
              {/* Profile Picture */}
              <img
                src={logedInuser?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() =>
                  (document.getElementById(drawerId).checked = true)
                }
              />
              <div className="drawer drawer-end">
                <input
                  id={drawerId}
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Your main page content here */}
                </div>

                <div className="drawer-side">
                  <label
                    htmlFor={drawerId}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Drawer content */}
                    <li>
                      <a>Name: {logedInuser?.displayName}</a>
                    </li>
                    <li>
                      <a>Email: {logedInuser?.email}</a>
                    </li>

                    <li>
                      <button onClick={handleLogOutUser}>LogOut</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              {" "}
              <Link className="btn ml-2" to="/sign_up">
                SignUp
              </Link>
              <Link className="btn ml-2" to="/log_in">
                LogIn
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
