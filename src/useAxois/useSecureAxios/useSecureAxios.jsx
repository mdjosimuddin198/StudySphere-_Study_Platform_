import axios from "axios";

const useSecureAxios = () => {
  const secureAxios = axios.create({
    baseURL: "http://localhost:5000",
  });
  return secureAxios;
};

export default useSecureAxios;
