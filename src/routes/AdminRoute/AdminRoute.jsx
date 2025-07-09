import React from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading/Loading";
import { Navigate } from "react-router";
import useUserRole from "../../hooks/useUserRole/useUserRole";

const AdminRoute = ({ children }) => {
  const { loading, logedInuser } = useAuth();
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();
  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (!logedInuser || !isAdmin) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default AdminRoute;
