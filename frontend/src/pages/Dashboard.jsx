import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { FiUsers, FiUserCheck, FiTrendingUp } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState({
    pemilik: [],
    hewan: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [pemilikRes, hewanRes, usersRes] = await Promise.all([
          axios.get("/api/pemilik"),
          axios.get("/api/hewan"),
          axios.get("/api/users"),
        ]);
        setData({
          pemilik: pemilikRes.data,
          hewan: hewanRes.data,
          users: usersRes.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    {
      label: "Total Pemilik",
      value: data.pemilik.length,
      icon: <FiUsers className="text-3xl" />,
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Total Hewan",
      value: data.hewan.length,
      icon: <FaPaw className="text-3xl" />,
      color: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Total User",
      value: data.users.length,
      icon: <FiUserCheck className="text-3xl" />,
      color: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Selamat datang kembali, berikut ringkasan data Anda
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 mt-4">Memuat data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-8 text-white transform hover:shadow-2xl hover:scale-105 transition duration-300 h-full`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium opacity-90 uppercase tracking-wide">
                        {stat.label}
                      </p>
                      <p className="text-5xl font-bold mt-4">{stat.value}</p>
                      <div className="flex items-center mt-4">
                        <FiTrendingUp className="text-green-300 mr-2" />
                        <p className="text-xs opacity-75">Data Real-time</p>
                      </div>
                    </div>
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Recent Activity Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ringkasan Pemilik
                </h2>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FiUsers className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Total Pemilik Terdaftar
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {data.pemilik.length}
                  </span>
                </div>
                {data.pemilik.length > 0 ? (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pemilik Terbaru:</p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      {data.pemilik[data.pemilik.length - 1]?.nama_pemilik ||
                        "-"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada data pemilik
                  </p>
                )}
              </div>
            </div>

            {/* Hewan Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ringkasan Hewan
                </h2>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaPaw className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Total Hewan Terdaftar
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {data.hewan.length}
                  </span>
                </div>
                {data.hewan.length > 0 ? (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Hewan Terbaru:</p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      {data.hewan[data.hewan.length - 1]?.nama_hewan || "-"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Jenis:{" "}
                      {data.hewan[data.hewan.length - 1]?.jenis_hewan || "-"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada data hewan
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Details Table Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Pemilik Table */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Daftar Pemilik Terbaru
                </h2>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {data.pemilik.length} Total
                </span>
              </div>
              {data.pemilik.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Nama
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Alamat
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          No Telepon
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.pemilik.slice(-5).map((p) => (
                        <tr
                          key={p.id}
                          className="border-b border-gray-100 hover:bg-blue-50 transition"
                        >
                          <td className="py-4 px-4 font-medium text-gray-800">
                            {p.nama_pemilik}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {p.alamat}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {p.no_telepon}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Belum ada data pemilik
                </p>
              )}
            </div>

            {/* Hewan Table */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Daftar Hewan Terbaru
                </h2>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {data.hewan.length} Total
                </span>
              </div>
              {data.hewan.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Nama Hewan
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Jenis
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">
                          Pemilik
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.hewan.slice(-5).map((h) => (
                        <tr
                          key={h.id}
                          className="border-b border-gray-100 hover:bg-green-50 transition"
                        >
                          <td className="py-4 px-4 font-medium text-gray-800">
                            {h.nama_hewan}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {h.jenis_hewan}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {h.nama_pemilik}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Belum ada data hewan
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
