import React, { useEffect, useState } from "react";
import axios from "../services/api";
import FormHewan from "../components/FormHewan";
import { FiPlus, FiEdit, FiTrash2, FiLoader } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";

export default function HewanList() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/hewan");
      setList(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus hewan ini?")) {
      try {
        await axios.delete(`/api/hewan/${id}`);
        await loadData();
      } catch (err) {
        alert("Gagal menghapus: " + err.response?.data?.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setShowForm(false);
    setEditing(null);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <FaPaw className="text-green-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Manajemen Hewan
            </h2>
            <p className="text-gray-600 mt-1">
              Kelola data hewan yang sedang dititipkan
            </p>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="mb-8 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
      >
        <FiPlus size={20} />
        Tambah Hewan Baru
      </button>

      {/* Form */}
      {showForm && (
        <FormHewan
          item={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <FiLoader className="text-4xl text-green-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat data hewan...</p>
          </div>
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <FaPaw className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            Belum ada data hewan. Silakan tambahkan hewan baru.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">No</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Nama Hewan
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Jenis</th>
                  <th className="px-6 py-4 text-left font-semibold">Pemilik</th>
                  <th className="px-6 py-4 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {list.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-green-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.nama_hewan}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.jenis_hewan}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.nama_pemilik}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 transform hover:scale-105"
                      >
                        <FiEdit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 transform hover:scale-105"
                      >
                        <FiTrash2 size={16} />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-t border-green-200">
            <p className="text-gray-700 font-semibold">
              Total Hewan:{" "}
              <span className="text-green-600 text-lg">{list.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
