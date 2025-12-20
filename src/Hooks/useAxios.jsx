import axios from "axios";
import React from "react";
const useAxios = axios.create({
  baseURL: "https://e-tution-bd-server.vercel.app",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
