import React from "react";
import logo from "../Images/Club Sphere.png";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="mx-auto w-11/12 mt-4">
      <Link to="/">
        <div className="flex  items-center gap-2">
          <div className=" ">
            <img
              className="w-11 h-11 border rounded-full object-cover hidden sm:block"
              src={logo}
              alt="Logo"
            />
          </div>
          <p className="text-2xl text-secondary font-bold btn-ghost">
            ClubSphere
          </p>
        </div>
      </Link>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
