import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://study-sphere-server-orpin.vercel.app",
  withCredentials: true,
});

const useSecureAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err.response?.status;
        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          navigate("/log_in");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useSecureAxios;
