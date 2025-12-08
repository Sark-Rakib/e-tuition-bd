import React from "react";
import { Link, NavLink } from "react-router";
// import logo from "../assets/Logos/logo.png";
// import "./Navbar.css";
import userAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = userAuth();

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="navbar w-11/12 mx-auto rounded-full px-5 mt-5 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="lg:hidden">
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
            <div
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/coverage">Coverage</NavLink>
              <NavLink to="/aboutUs">About Us</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              {user ? <NavLink to="/percel">Send A Percel</NavLink> : ""}

              {user ? (
                <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
              ) : (
                ""
              )}

              <Link className="btn bg-[#CAEB66] mr-2" to="/rider">
                Be a Rider
              </Link>
            </div>
          </div>
          <img className="h-10 ml-3" src="" alt="" />
          <a className="text-xl -ms-3 mt-2">ZapShift</a>
        </div>
        <div className="navbar-center hidden md:flex">
          <div className="menu menu-horizontal px-1 flex gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/coverage">Coverage</NavLink>
            <NavLink to="/aboutUs">About Us</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            {user ? <NavLink to="/percel">Send A Percel</NavLink> : ""}
            {user ? (
              <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link
              className="navbar-center hidden md:flex btn bg-[#CAEB66] mr-2"
              to="/rider"
            >
              Be a Rider
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn bg-[#CAEB66]">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn bg-[#CAEB66]">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
