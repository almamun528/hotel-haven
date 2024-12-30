import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <>
      <section className="w-10/12 mx-auto">
      <NavBar/>
        <Outlet />
        <Footer/>
      </section>
    </>
  );
};

export default Layout;
