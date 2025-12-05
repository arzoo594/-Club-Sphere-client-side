import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RootLayOut = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-245px)] w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayOut;
