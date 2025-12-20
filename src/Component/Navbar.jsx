import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../assets/e-tuition-bd.png";
import "./Navbar.css";
import userAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user } = userAuth();

  const menuItems = (
    <>
      <NavLink to="/" className="block py-2 px-4 hover:bg-gray-100 rounded">
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="block py-2 px-4 hover:bg-gray-100 rounded"
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className="block py-2 px-4 hover:bg-gray-100 rounded"
      >
        Contact
      </NavLink>
      {user && (
        <NavLink
          to="/tuition"
          className="block py-2 px-4 hover:bg-gray-100 rounded"
        >
          Tuitions List
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/tutors"
          className="block py-2 px-4 hover:bg-gray-100 rounded"
        >
          Tutors List
        </NavLink>
      )}
      {user && (
        <>
          <Link
            to="/add-tuition"
            className="block py-2 px-4 btn btn-primary btn-sm mt-2"
          >
            Add Tuition
          </Link>
          <Link
            to="/add-tutors"
            className="block py-2 px-4 btn btn-primary btn-sm mt-2"
          >
            Add Tutors
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-5 w-11/12 mx-auto rounded-full px-5 mt-5 bg-base-100 z-50 shadow-sm">
      <div className="navbar-start">
        {/* Mobile & Tablet Hamburger */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60 p-4 shadow-lg"
          >
            {menuItems}
          </ul>
        </div>

        <img className="h-12 ml-3" alt="E-Tuition BD Logo" src={Logo} />
      </div>

      {/* Desktop Menu  */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user && <NavLink to="/tuition">Tuitions List</NavLink>}
          {user && <NavLink to="/tutors">Tutors List</NavLink>}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex gap-2">
          {user && (
            <Link className="btn btn-primary" to="/add-tuition">
              Add Tuition
            </Link>
          )}
          {user && (
            <Link className="btn btn-primary" to="/add-tutors">
              Add Tutors
            </Link>
          )}
        </div>

        {/* Dashboard / Login */}
        {user ? (
          <Link className="btn btn-primary ml-2" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
