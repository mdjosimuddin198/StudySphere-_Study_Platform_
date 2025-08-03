import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";

import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxois from "../../../useAxois/useAxois";

// import { Helmet } from "react-helmet";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const { creatAccount, updateUser, setLogedInUser, handlegoogle } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const [showPass, setShowPass] = useState(false);
  const axoisInstece = useAxois();

  const handleshowPassword = () => {
    setShowPass(!showPass);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg(false);
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const email = form.email.value;

    if (password.length < 6) {
      setErrorMsg("password must be 6 characters or longer ");
      toast.error(`password must be 6 characters or longer`);
    } else if (!/[A-Z]/.test(password)) {
      setErrorMsg("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
    } else if (!/[a-z]/.test(password)) {
      setErrorMsg(" Password must contain at least one lowercase letter.");
      toast.error(` Password must contain at least one lowercase letter`);
    } else {
      creatAccount(email, password)
        .then(async (result) => {
          // console.log(result);
          const user = result.user;

          const userInfo = {
            email: email,
            role: "user", //update its student or admin
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          };

          const userRes = await axoisInstece.post("/users", userInfo);
          console.log(userRes.data);

          updateUser({ displayName: name, photoURL: profilePic })
            .then(() => {
              // console.log(user);
              setLogedInUser({
                ...user,
                displayName: name,
                photoURL: profilePic,
              });
            })
            .catch((error) => {
              console.log(error);
              setLogedInUser(user);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("error found");
        });

      setSuccessMsg(true);
      toast.success(`Account Create  SuccessFully `);
      navigate("/");
    }

    // console.log(name, photo, password, email);
    return;
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
        console.log(userRes.data);

        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`Loged In SuccessFully `);
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error found");
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
    // console.log(res.data);
  };

  return (
    <>
      {/* <Helmet>
        <title>Resister now|GreenBox BD</title>
      </Helmet> */}

      <div className="card bg-base-100 mx-auto  w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            {/* name  */}
            <label className="label text-xl">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              required
            />
            {/* photourl  */}
            {/* <label className="label text-xl">PhotoURL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="PhotoURL"
              required
            /> */}
            <label className="label text-xl">Photo</label>
            <input
              onChange={handleImageUpload}
              type="file"
              // name="photo"
              className="input"
              placeholder="your Image"
              required
            />
            {/* email */}
            <label className="label text-xl">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />
            {/* password  */}
            <div className="relative">
              <label className="label mt-4">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="input "
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={handleshowPassword}
                className="btn absolute right-4"
              >
                {showPass ? <FiEyeOff></FiEyeOff> : <BsEye></BsEye>}
              </button>
            </div>
            {/* end  */}

            <button className="btn btn-neutral mt-4">Register Now</button>
            <p className="text-sm text-base-200">
              Allready have account{" "}
              <Link className="text-blue-400 underline" to="/log_in">
                {"   "}
                Login Now{" "}
              </Link>
            </p>
            {errorMsg && <p className="text-red-400">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-500">Account have Create SuccessFully</p>
            )}
          </form>
          {/* Login with google  */}
          <button
            onClick={handleGoogoleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <FcGoogle></FcGoogle>
            Login with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
