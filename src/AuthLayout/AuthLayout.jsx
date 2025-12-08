import React from "react";
import { Link, Outlet } from "react-router";
import img from "../assets/e-tuition-bd.png";
import logo from "../assets/e-tuition-bd.png";

const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Link to="/">
        <div className="h-20 w-20 flex items-center mt-5">
          <img src={logo} />
        </div>
      </Link>
      <div className="md:flex justify-center items-center bg-base-200 mt-10 p-10 rounded">
        <div>
          <Outlet></Outlet>
        </div>
        <div>
          <img className="w-100 h-100" src={img} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
