import React from "react";
import PageNotFound from "../../assets/LottieFiles/Lottie404.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] flex items-center justify-center flex-col">
        <Lottie animationData={PageNotFound} loop={true}></Lottie>
        <Link to="/" className="btn bg-[#00acc1]">
          Go To Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
