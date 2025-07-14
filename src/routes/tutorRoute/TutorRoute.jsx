import React from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import Loading from "../../components/loading/Loading";

const TutorRoute = ({ children }) => {
  const { loading, logedInuser } = useAuth();
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();
  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (!logedInuser || !isTutor) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default TutorRoute;
