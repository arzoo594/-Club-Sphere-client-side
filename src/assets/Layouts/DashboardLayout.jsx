import { Link, Outlet } from "react-router";
import logo from "../Images/Club Sphere.png";

// Icons / Images
import party from "../Images/event-management.png";
import golf from "../Images/golf-club.png";
import team from "../Images/team (1).png";
import create from "../Images/create-content.gif";
import request from "../Images/questions.png";
import members from "../Images/members.png";
import requ_approve from "../Images/request-for-proposal (1).png";
import golf_1 from "../Images/golf-club (1).png";
import Home from "../Images/house.png";
import all_events from "../Images/festival.png";

import { AuthContext } from "../Contexts/AuthContext";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);

  const menuItemClass =
    "flex items-center gap-3 p-2 rounded hover:bg-base-300 transition duration-200";

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 px-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <div className="flex items-center gap-2 font-bold text-2xl text-secondary">
              <img src={logo} className="w-11 h-11 rounded-full" alt="Logo" />
              ClubSphere
            </div>
          </nav>

          {/* Page Content */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <aside className="flex flex-col min-h-full w-64 bg-base-200 p-4">
            {/* Sidebar Header */}
            <div className="flex items-center mb-6 gap-2">
              <img src={logo} className="w-12 h-12 rounded-full" alt="Logo" />
              <span className="text-xl font-bold text-primary">Dashboard</span>
            </div>

            {/* Menu */}
            <ul className="menu flex flex-col gap-2">
              {/* Common */}
              <li>
                <Link to="/" className={menuItemClass}>
                  <img src={Home} className="w-8 h-8" alt="" />
                  <p className="font-bold text-secondary"> Homepage</p>
                </Link>
              </li>

              {/* Members Section */}
              <>
                <p className="font-bold text-lg text-center text-primary mt-4 mb-2">
                  ⭐ Members ⭐
                </p>
                <li>
                  <Link to="/clubs" className={menuItemClass}>
                    <img src={golf} className="w-8 h-8" alt="" />
                    <p className="font-bold text-secondary">Clubs</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/dashboard/member-event"
                    className={menuItemClass}
                  >
                    <img src={party} className="w-8 h-8" alt="" />
                    <p className="font-bold text-secondary"> Member Event</p>
                  </Link>
                </li>
              </>

              {/* Manager Section */}
              {role === "manager" && (
                <>
                  <p className="font-bold text-lg text-center text-primary mt-4 mb-2">
                    ⭐ Manager ⭐
                  </p>
                  <li>
                    <Link
                      to="/dashboard/dashboard/my-club"
                      className={menuItemClass}
                    >
                      <img src={golf} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> My Club</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/club-members"
                      className={menuItemClass}
                    >
                      <img src={team} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary">Club Members</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/club-events"
                      className={menuItemClass}
                    >
                      <img src={party} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> Club Events</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/create-club"
                      className={menuItemClass}
                    >
                      <img src={create} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> Create Club</p>
                    </Link>
                  </li>
                </>
              )}

              {/* Admin Section */}

              {role == "admin" && (
                <>
                  <p className="font-bold text-lg text-center text-primary mt-4 mb-2">
                    ⭐ Admin ⭐
                  </p>
                  <li>
                    <Link
                      to="/dashboard/dashboard/club-request"
                      className={menuItemClass}
                    >
                      <img src={request} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> Club Requests</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/all-members"
                      className={menuItemClass}
                    >
                      <img src={members} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> All Members</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/manager-request"
                      className={menuItemClass}
                    >
                      <img src={requ_approve} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary">
                        {" "}
                        Manager Request Approved
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/all-clubs"
                      className={menuItemClass}
                    >
                      <img src={golf_1} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> All Clubs</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/dashboard/all-events"
                      className={menuItemClass}
                    >
                      <img src={all_events} className="w-8 h-8" alt="" />
                      <p className="font-bold text-secondary"> All Events</p>
                    </Link>
                  </li>
                </>
              )}
              {/* Settings */}
              <li className="mt-auto">
                <button className={menuItemClass}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  <span className="ml-2 font-bold">Settings</span>
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
