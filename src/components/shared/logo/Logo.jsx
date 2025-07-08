import React from "react";
import { AiOutlineRead } from "react-icons/ai"; // Book/learning related icon

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <AiOutlineRead className="text-2xl text-cyan-600" />
      <span className="text-2xl font-bold text-cyan-600">StudySphere</span>
    </div>
  );
};

export default Logo;
