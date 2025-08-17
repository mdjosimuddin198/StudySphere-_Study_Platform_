// DashboardLayot.jsx
import React from "react";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import useAuth from "../../hooks/useAuth";
import Charts from "../dashboard/Charts";

const DashboardLayot = () => {
  const { logedInuser, setLogedInUser, logOutUser } = useAuth();
  let { role, isRoleLoading, isAdmin, isTutor } = useUserRole();
  if (role === "user") {
    role = "student";
  }
  const user = {
    name: logedInuser?.displayName,
    email: logedInuser?.email,
    phone: "+1 234 567 890",
    address: "123 Main Street, New York, USA",
    role: role,
    image: logedInuser?.photoURL,
  };
  return (
    <div className="flex-1 p-6 bg-[#0f172a] text-white ">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl shadow-lg border border-[#334155]">
        <h2 className="text-xl font-semibold">Education Dashboard</h2>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90">
          Log Out
        </button>
      </header>
      <div className=" p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl  font-bold mb-6">Profile Information</h2>
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
          />

          {/* User Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold ">{user.name}</h3>
            <p className="text-gray-600">{user.role}</p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> coming soon
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> coming soon
            </p>
          </div>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] hover:shadow-cyan-500/30 transition">
          <h3 className="text-lg font-medium text-gray-300">Total Students</h3>
          <p className="text-3xl font-bold mt-2 text-cyan-400">1,245</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] hover:shadow-green-500/30 transition">
          <h3 className="text-lg font-medium text-gray-300">Total Teachers</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">85</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] hover:shadow-yellow-500/30 transition">
          <h3 className="text-lg font-medium text-gray-300">Active Courses</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-400">32</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] hover:shadow-pink-500/30 transition">
          <h3 className="text-lg font-medium text-gray-300">Monthly Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-pink-400">$12,430</p>
        </div>
      </div>
      <Charts></Charts>
    </div>
  );
};

export default DashboardLayot;
