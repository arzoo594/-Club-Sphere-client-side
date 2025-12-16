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
          confirmButtonColor: "#8b5cf6",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Logout Failed!",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      });
  };

  const navLinkStyle = ({ isActive }) =>
    `relative px-4 py-2 font-semibold transition-all duration-300
     ${
       isActive ? "text-white after:w-full" : "text-purple-200 hover:text-white"
     }
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-gradient-to-r after:from-pink-400 after:to-purple-400
     after:w-0 hover:after:w-full after:transition-all after:duration-300`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#1a0033]/90 via-[#2d0b59]/90 to-[#0f172a]/90 border-b border-purple-800/40">
      <div className="w-11/12 mx-auto navbar text-white">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h10m-10 6h16"
                />
              </svg>
            </div>

            {/* Mobile Menu */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content mt-3 w-56 p-3 rounded-xl shadow-xl
              bg-gradient-to-br from-[#1a0033] to-[#2d0b59] border border-purple-700"
            >
              <li>
                <NavLink to="/" className="text-purple-200 hover:text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/clubs"
                  className="text-purple-200 hover:text-white"
                >
                  Clubs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className="text-purple-200 hover:text-white"
                >
                  Events
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/be-a-manager">Be a Club Manager</NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              className="w-10 h-10 rounded-full border border-purple-500 hidden sm:block"
            />
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              ClubSphere
            </h1>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-2">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/clubs" className={navLinkStyle}>
                Clubs
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={navLinkStyle}>
                Events
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/be-a-manager" className={navLinkStyle}>
                  Be a Club Manager
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to="/dashboard" className={navLinkStyle}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end relative">
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || logo}
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:scale-105 transition"
                onClick={() => setShowUserInfo(!showUserInfo)}
              />

              {showUserInfo && (
                <div
                  className="absolute right-0 mt-3 w-60 p-4 rounded-xl shadow-xl
                bg-gradient-to-br from-[#1a0033] to-[#2d0b59] border border-purple-700"
                >
                  <p className="text-sm text-purple-200 font-semibold">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-purple-300">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full py-2 rounded-full font-semibold text-white
                    bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full font-bold text-white
              bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition"
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
