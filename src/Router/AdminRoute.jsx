import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Component/Loading";

const AdminRoute = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  return <div></div>;
};

export default AdminRoute;
