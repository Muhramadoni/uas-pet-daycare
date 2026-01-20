import * as PemilikModel from "../models/Pemilik.js";

export const getPemilik = async (req, res) => {
  try {
    const data = await PemilikModel.getAllPemilik();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPemilik = async (req, res) => {
  const { nama_pemilik, alamat, no_telepon } = req.body;
  try {
    await PemilikModel.createPemilik(nama_pemilik, alamat, no_telepon);
    res.status(201).json({ message: "Data pemilik berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePemilik = async (req, res) => {
  const { id } = req.params;
  const { nama_pemilik, alamat, no_telepon } = req.body;
  try {
    await PemilikModel.updatePemilik(id, nama_pemilik, alamat, no_telepon);
    res.json({ message: "Data pemilik berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePemilik = async (req, res) => {
  const { id } = req.params;
  try {
    await PemilikModel.deletePemilik(id);
    res.json({ message: "Data pemilik berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
