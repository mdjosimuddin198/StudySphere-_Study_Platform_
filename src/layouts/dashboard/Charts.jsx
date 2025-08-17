"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const barData = [
  { name: "Users", value: 120 },
  { name: "Admins", value: 10 },
  { name: "Projects", value: 45 },
  { name: "Tasks", value: 150 },
];

const pieData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "In Progress", value: 10 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

export default function Charts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Bar Chart Card */}
      <div className=" p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">System Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Card */}
      <div className=" p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#4F46E5"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
