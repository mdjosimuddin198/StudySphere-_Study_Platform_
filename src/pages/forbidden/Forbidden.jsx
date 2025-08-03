import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-200 text-center px-4">
      <FaLock className="text-6xl text-error mb-4" />
      <h1 className="text-4xl font-bold text-error">403 - Forbidden</h1>
      <p className="text-lg mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="btn bg-[#00E1FF] text-black mt-6">
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default Forbidden;
