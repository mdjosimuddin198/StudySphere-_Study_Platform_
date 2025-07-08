import axios from "axios";

const useAxois = () => {
  const axoisInstece = axios.create({
    baseURL: "http://localhost:5000",
  });
  return axoisInstece;
};

export default useAxois;
