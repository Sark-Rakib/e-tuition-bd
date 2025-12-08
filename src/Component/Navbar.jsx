import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../assets/e-tuition-bd.png";
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
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {user ? <NavLink to="/tuition">Tuitions</NavLink> : ""}
              {user ? <NavLink to="/tutors">Tutors</NavLink> : ""}
              {user ? (
                <Link className="btn btn-primary mr-2" to="/add-tuition">
                  Add Tuition
                </Link>
              ) : (
                ""
              )}
              {user ? (
                <Link className="btn btn-primary mr-2" to="/add-tutors">
                  Add Tutors
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <img className="h-13 ml-3" src={Logo} alt="" />
        </div>
        <div className="navbar-center hidden md:flex">
          <div className="menu menu-horizontal px-1 flex gap-10">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {user ? <NavLink to="/tuition">Tuitions</NavLink> : ""}
            {user ? <NavLink to="/tutors">Tutors</NavLink> : ""}
          </div>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link
              className="navbar-center hidden md:flex btn btn-primary mr-2"
              to="/add-tuition"
            >
              Add Tuition
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <Link
              className="navbar-center hidden md:flex btn btn-primary mr-2"
              to="add-tutors"
            >
              Add Tutors
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
