import axios from "axios";
import React from "react";
const useAxios = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
