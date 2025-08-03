import React, { use, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginINLottei from "../../../assets/LottieFiles/LoginLottie.json";

import useAuth from "../../../hooks/useAuth";
import useAxois from "../../../useAxois/useAxois";

const LogIn = () => {
  const axoisInstece = useAxois();
  const { loginUser, handlegoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, password);

    loginUser(email, password)
      .then((result) => {
        // console.log(result);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`Loged In SuccessFully `);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error found");
      });
  };

  const handleGoogoleLogin = () => {
    // console.log("hello login ");
    handlegoogle()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          email: user.email,
          role: "user", //update its student or admin
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axoisInstece.post("/users", userInfo);
        // console.log(userRes.data);

        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`Loged In SuccessFully `);
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error found");
      });
  };

  return (
    <div className="flex items-center justify-center mx-4 flex-col md:flex-row">
      <div className="card bg-base-100 mx-auto my-20 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-3xl text-center">LogIn Now </h2>
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label text-xl">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label text-xl">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <Link
                // to="/auth/log_in/forget-password"
                className="link link-hover text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-neutral mt-4">LogIn Now</button>
            <p className="text-sm ">
              Don't have account yet{" "}
              <Link className="text-blue-400 underline" to="/sign_up">
                {"   "}
                Register Now{" "}
              </Link>
            </p>
          </form>
          {/* Google */}
          <button
            onClick={handleGoogoleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <FcGoogle></FcGoogle>
            Login with Google
          </button>
        </div>
      </div>
      <div className="md:w-[500px] ">
        <Lottie animationData={loginINLottei} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default LogIn;
