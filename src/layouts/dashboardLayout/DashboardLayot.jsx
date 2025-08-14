// DashboardLayot.jsx
import React from "react";

const DashboardLayot = () => {
  return (
    <div className="flex-1 p-6 bg-[#0f172a] text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl shadow-lg border border-[#334155]">
        <h2 className="text-xl font-semibold">Education Dashboard</h2>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90">
          Log Out
        </button>
      </header>

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

      {/* Upcoming Classes */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155] mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          Upcoming Classes
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0f172a]">
              <th className="border-b border-[#334155] p-2">Date</th>
              <th className="border-b border-[#334155] p-2">Course</th>
              <th className="border-b border-[#334155] p-2">Teacher</th>
              <th className="border-b border-[#334155] p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#334155] p-2">Aug 15, 2025</td>
              <td className="border-b border-[#334155] p-2">Mathematics</td>
              <td className="border-b border-[#334155] p-2">Mr. Rahman</td>
              <td className="border-b border-[#334155] p-2">10:00 AM</td>
            </tr>
            <tr>
              <td className="border-b border-[#334155] p-2">Aug 16, 2025</td>
              <td className="border-b border-[#334155] p-2">Physics</td>
              <td className="border-b border-[#334155] p-2">Dr. Karim</td>
              <td className="border-b border-[#334155] p-2">12:00 PM</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Completion Status */}
      <div className="bg-[#1e293b] rounded-xl shadow-lg p-6 border border-[#334155]">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          Course Completion Status
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0f172a]">
              <th className="border-b border-[#334155] p-2">Student Name</th>
              <th className="border-b border-[#334155] p-2">Course</th>
              <th className="border-b border-[#334155] p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#334155] p-2">John Doe</td>
              <td className="border-b border-[#334155] p-2">Mathematics</td>
              <td className="border-b border-[#334155] p-2 text-green-400">
                85%
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#334155] p-2">Jane Smith</td>
              <td className="border-b border-[#334155] p-2">Physics</td>
              <td className="border-b border-[#334155] p-2 text-yellow-400">
                60%
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#334155] p-2">Alex Johnson</td>
              <td className="border-b border-[#334155] p-2">Biology</td>
              <td className="border-b border-[#334155] p-2 text-red-400">
                35%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardLayot;
