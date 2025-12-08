import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h1>layout</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
