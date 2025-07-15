import axios from "axios";

const useAxois = () => {
  const axoisInstece = axios.create({
    baseURL: "https://study-sphere-server-orpin.vercel.app",
    withCredentials: true,
  });
  return axoisInstece;
};

export default useAxois;
