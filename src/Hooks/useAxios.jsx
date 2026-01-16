import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://e-tuition-bd-server.onrender.com",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
