import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { FaHome } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/"); // or navigate("/login")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar text-white sticky top-0 z-10 w-full bg-blue-900">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">e-Tuition-BD Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-blue-900 is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="btn btn-primary flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}

                <FaHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}

            <li>
              <Link
                to="/dashboard/student"
                className="btn btn-primary flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Student"
              >
                {/* Student icon */}

                <PiStudent />
                <span className="is-drawer-close:hidden">Student</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/tuitor"
                className="btn btn-primary flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Tuitor"
              >
                {/* tuitor icon */}

                <FaChalkboardTeacher />
                <span className="is-drawer-close:hidden">Tuitor</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/admin"
                className="btn btn-primary flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="User Management"
              >
                {/* admin icon */}

                <MdAdminPanelSettings />
                <span className="is-drawer-close:hidden">User Management</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/payment"
                className="btn btn-primary flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                {/* payment icon */}

                <MdPayment />
                <span className="is-drawer-close:hidden">Payment History</span>
              </Link>
            </li>

            {/* user profile */}
            <div className="mt-86 md:mt-103">
              <li>
                <Link
                  to="/dashboard/profile"
                  className="btn btn-primary flex items-center mb-1 gap-2
    is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                >
                  {/* profile icon */}
                  {/* <FaUserCircle className="text-lg" /> */}
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </Link>
              </li>

              {/* log out button */}
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Log Out"
                >
                  {/* logout icon */}
                  <CiLogout />
                  <span className="is-drawer-close:hidden">Logout</span>
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
