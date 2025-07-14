import { useQuery } from "@tanstack/react-query";

import React from "react";
import useAxois from "../../../useAxois/useAxois";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";
import Loading from "../../../components/loading/Loading";
import { Navigate } from "react-router";

const AllUsers = () => {
  const axiosSecure = useSecureAxios();
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:5000/users");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <Navigate to="/forbidden"></Navigate>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-cyan-600 mb-4">All Users</h2>

      <table className="table w-full">
        <thead className="bg-cyan-100">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : user.role === "tutor"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>{new Date(user.last_log_in).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
