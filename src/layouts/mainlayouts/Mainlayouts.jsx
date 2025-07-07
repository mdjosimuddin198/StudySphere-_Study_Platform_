import React from "react";
import Navbar from "../../components/shared/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/shared/footer/Footer";

const Mainlayouts = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-11/12 mx-auto">
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <footer className="w-11/12 mx-auto">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Mainlayouts;
