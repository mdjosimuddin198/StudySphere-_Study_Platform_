import React from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import Loading from "../../components/loading/Loading";

const StudentRoute = ({ children }) => {
  const { loading, logedInuser } = useAuth();
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();
  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (!logedInuser || role !== "user") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default StudentRoute;
