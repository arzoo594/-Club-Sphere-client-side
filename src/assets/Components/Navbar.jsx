import React, { useContext, useState } from "react";
import logo from "../Images/Club Sphere.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showUserInfo, setShowUserInfo] = useState(false);

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
    <div className="bg-base-100 shadow-sm relative">
      <div className="w-11/12 mx-auto navbar">
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
                <NavLink to="/" className="font-semibold text-secondary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/clubs" className="font-semibold text-secondary">
                  Clubs
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="font-semibold text-secondary">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/be-a-manager"
                  className="font-semibold text-secondary"
                >
                  Be a Club Manager
                </NavLink>
              </li>
            </ul>
          </div>

          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                className="w-11 h-11 border rounded-full object-cover hidden sm:block"
                src={logo}
                alt="Logo"
              />
              <p className="text-2xl text-secondary font-bold btn-ghost">
                ClubSphere
              </p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="font-semibold text-secondary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/clubs" className="font-semibold text-secondary">
                Clubs
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className="font-semibold text-secondary">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/be-a-manager"
                className="font-semibold text-secondary"
              >
                Be a Club Manager
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end relative">
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || logo}
                alt="User"
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() => setShowUserInfo(!showUserInfo)}
              />
              {showUserInfo && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded p-4 z-20">
                  <p className="font-semibold text-secondary">
                    Name: {user.displayName}
                  </p>
                  <p className="font-semibold text-secondary">
                    Email: {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm mt-2 w-full text-white bg-secondary border-none"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
