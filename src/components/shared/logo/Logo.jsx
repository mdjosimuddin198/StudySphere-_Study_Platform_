import React from "react";
import { AiOutlineRead } from "react-icons/ai"; // Book/learning related icon
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 cursor-pointer z-50">
      <AiOutlineRead className="md:text-2xl text-sm text-cyan-600" />
      <span className="md:text-2xl text-sm font-bold text-cyan-600">
        StudySphere
      </span>
    </Link>
  );
};

export default Logo;
