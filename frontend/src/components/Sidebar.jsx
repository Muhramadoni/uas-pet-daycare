import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiUserCheck, FiLogOut } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      path: "/pemilik",
      label: "Manajemen Pemilik",
      icon: <FiUsers className="text-lg" />,
    },
    {
      path: "/hewan",
      label: "Manajemen Hewan",
      icon: <FaPaw className="text-lg" />,
    },
    {
      path: "/users",
      label: "Manajemen User",
      icon: <FiUserCheck className="text-lg" />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen fixed left-0 top-0 p-6 shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <FaPaw className="text-white text-lg" />
          </div>
          <h1 className="text-xl font-bold">Pet DayCare</h1>
        </div>

        {/* Navigation */}
        <nav className="mb-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition duration-200 transform hover:scale-105"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
