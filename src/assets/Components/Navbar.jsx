import React, { useContext } from "react";
import logo from "../Images/Club Sphere.png";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Logout Failed!",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#6366f1",
        });
      });
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="w-11/12 mx-auto navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

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
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 w-40 z-10">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        {/* <div className="navbar-end">
          <Link
            to="/login"
            className="btn text-secondary border border-secondary font-bold"
          >
            Login
          </Link>
        </div> */}
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn text-secondary border border-secondary font-bold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn text-secondary border border-secondary font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
