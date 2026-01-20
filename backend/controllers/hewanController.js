import db from "../config/database.js";
import * as HewanModel from "../models/Hewan.js";

export const getHewan = async (req, res) => {
  try {
    const resData = await db.execute(`
            SELECT hewan.*, pemilik.nama_pemilik 
            FROM hewan 
            JOIN pemilik ON hewan.pemilik_id = pemilik.id
        `);
    res.json(resData.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addHewan = async (req, res) => {
  const { nama_hewan, jenis_hewan, pemilik_id } = req.body;
  try {
    await HewanModel.createHewan(nama_hewan, jenis_hewan, pemilik_id);
    res.status(201).json({ message: "Data hewan berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHewan = async (req, res) => {
  const { id } = req.params;
  const { nama_hewan, jenis_hewan, pemilik_id } = req.body;
  try {
    await HewanModel.updateHewan(id, nama_hewan, jenis_hewan, pemilik_id);
    res.json({ message: "Data hewan berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHewan = async (req, res) => {
  const { id } = req.params;
  try {
    await HewanModel.deleteHewan(id);
    res.json({ message: "Data hewan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
