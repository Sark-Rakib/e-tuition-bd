import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://e-tution-bd-server.vercel.app",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
