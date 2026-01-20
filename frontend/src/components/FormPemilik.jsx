import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { FiX, FiSave, FiEdit2, FiPlus, FiAlertCircle } from "react-icons/fi";

export default function FormPemilik({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    nama_pemilik: "",
    alamat: "",
    no_telepon: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) setForm(item);
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (item) {
        await axios.put(`/api/pemilik/${item.id}`, form);
      } else {
        await axios.post("/api/pemilik", form);
      }
      onSave();
    } catch (err) {
      setError("Error: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {item ? (
            <FiEdit2 className="text-2xl text-blue-600" />
          ) : (
            <FiPlus className="text-2xl text-green-600" />
          )}
          <h3 className="text-2xl font-bold text-gray-900">
            {item ? "Edit Pemilik" : "Tambah Pemilik Baru"}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiX size={24} className="text-gray-600" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-3">
          <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Nama Pemilik
            </label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Masukkan nama pemilik"
              value={form.nama_pemilik}
              onChange={(e) =>
                setForm({ ...form, nama_pemilik: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              No Telepon
            </label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Contoh: 081234567890"
              value={form.no_telepon}
              onChange={(e) => setForm({ ...form, no_telepon: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Alamat
          </label>
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="Masukkan alamat lengkap"
            rows="4"
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <FiSave size={18} />
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
