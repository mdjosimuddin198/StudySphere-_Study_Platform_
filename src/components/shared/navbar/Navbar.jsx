import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Logo from "../logo/Logo";
import { motion } from "framer-motion";
import { FaBarsStaggered } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const drawerId = "my-drawer-4";
const Navbar = () => {
  const [isopen, setIsopen] = useState(false);
  const { logedInuser, setLogedInUser, logOutUser } = useAuth();

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isopen]);
  const handleOpen = () => {
    setIsopen((prv) => !prv);
  };
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
      <NavLink onClick={handleOpen} className="ml-4" to="/">
        HOME
      </NavLink>
      <NavLink onClick={handleOpen} className="ml-4" to="/be_a_tutor">
        BE A TUTOR
      </NavLink>
      <NavLink onClick={handleOpen} className="ml-4" to="/all_tutor">
        VIEW ALL TUTOR
      </NavLink>
      <NavLink onClick={handleOpen} className="ml-4" to="/study_session">
        STUDY SESSION
      </NavLink>

      <NavLink onClick={handleOpen} className="ml-4" to="/dashboard">
        DASHBOARD
      </NavLink>

      <NavLink onClick={handleOpen} className="ml-4" to="/about_us">
        ABOUT US
      </NavLink>
    </>
  );
  return (
    <>
      <motion.aside
        initial={{ y: "-100%" }}
        animate={{ y: isopen ? "0%" : "-140%" }}
        ransition={{ duration: 1.0, ease: "easeIn" }}
        className="md:hidden fixed pt-18   min-h-screen left-0 top-0 right-0 w-full bg-gray-700 text-white flex flex-col p-4 "
      >
        {links}
      </motion.aside>

      <div className="navbar bg-gray-700 my-6  rounded-2xl border-2 shadow-sm">
        <div className="navbar-start">
          <button onClick={handleOpen} className="px-4 lg:hidden z-50">
            {isopen ? <ImCross /> : <FaBarsStaggered />}
          </button>
          {/* <div className="dropdown">
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
          </div> */}
          <Logo></Logo>
        </div>
        <div className="navbar-center text-white hidden lg:flex">
          <ul className="menu menu-horizontal  px-1">{links}</ul>
        </div>
        <div className="navbar-end z-40">
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
            <div className="flex gap-1">
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
