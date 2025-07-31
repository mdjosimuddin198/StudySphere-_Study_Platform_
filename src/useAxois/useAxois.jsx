import axios from "axios";

const useAxois = () => {
  const axoisInstece = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
  return axoisInstece;
};

export default useAxois;
