import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { FiUserCheck, FiLoader, FiMail } from "react-icons/fi";

export default function UserList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await axios.get("/api/users");
        setList(response.data);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FiUserCheck className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Manajemen User</h2>
            <p className="text-gray-600 mt-1">Kelola pengguna sistem</p>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <FiLoader className="text-4xl text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat data user...</p>
          </div>
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <FiUserCheck className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Belum ada data user.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">No</th>
                  <th className="px-6 py-4 text-left font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {list.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <FiMail size={16} className="text-purple-600" />
                      {item.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-t border-purple-200">
            <p className="text-gray-700 font-semibold">
              Total User:{" "}
              <span className="text-purple-600 text-lg">{list.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
