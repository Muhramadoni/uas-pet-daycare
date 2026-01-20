import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { FiX, FiSave, FiEdit2, FiPlus, FiAlertCircle } from "react-icons/fi";

export default function FormHewan({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    nama_hewan: "",
    jenis_hewan: "",
    pemilik_id: "",
  });
  const [pemilikList, setPemilikList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPemilik() {
      try {
        const response = await axios.get("/api/pemilik");
        setPemilikList(response.data);
      } catch (err) {
        console.error("Failed to load pemilik:", err);
      }
    }
    loadPemilik();
  }, []);

  useEffect(() => {
    if (item) setForm({ ...item, pemilik_id: item.pemilik_id || "" });
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (item) {
        await axios.put(`/api/hewan/${item.id}`, form);
      } else {
        await axios.post("/api/hewan", form);
      }
      onSave();
    } catch (err) {
      setError("Error: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {item ? (
            <FiEdit2 className="text-2xl text-blue-600" />
          ) : (
            <FiPlus className="text-2xl text-green-600" />
          )}
          <h3 className="text-2xl font-bold text-gray-900">
            {item ? "Edit Hewan" : "Tambah Hewan Baru"}
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
              Nama Hewan
            </label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
              placeholder="Masukkan nama hewan"
              value={form.nama_hewan}
              onChange={(e) => setForm({ ...form, nama_hewan: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Jenis Hewan
            </label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
              placeholder="Contoh: Anjing, Kucing, dll"
              value={form.jenis_hewan}
              onChange={(e) =>
                setForm({ ...form, jenis_hewan: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pilih Pemilik
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
            value={form.pemilik_id}
            onChange={(e) =>
              setForm({ ...form, pemilik_id: parseInt(e.target.value) || "" })
            }
            required
          >
            <option value="">-- Pilih Pemilik --</option>
            {pemilikList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_pemilik}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
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
