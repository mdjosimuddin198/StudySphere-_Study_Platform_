import React, { use } from "react";
import { Navigate, useLocation } from "react-router";

import Loading from "../../components/loading/Loading";
import useAuth from "../../hooks/useAuth";

const PrivetRoutes = ({ children }) => {
  const { setLogedInUser, loading, logedInuser } = useAuth();
  // console.log(loading);
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname);

  if (loading) {
    return <Loading></Loading>;
  }

  if (logedInuser && logedInuser?.email) {
    return children;
  }
  return <Navigate to="/log_in" state={location.pathname}></Navigate>;
};

export default PrivetRoutes;
