import db from "../config/database.js";

export const getAllPemilik = async () => {
  const result = await db.execute("SELECT * FROM pemilik");
  return result.rows;
};

export const createPemilik = async (nama, alamat, telp) => {
  return await db.execute({
    sql: "INSERT INTO pemilik (nama_pemilik, alamat, no_telepon) VALUES (?, ?, ?)",
    args: [nama, alamat, telp],
  });
};

export const updatePemilik = async (id, nama, alamat, telp) => {
  return await db.execute({
    sql: "UPDATE pemilik SET nama_pemilik = ?, alamat = ?, no_telepon = ? WHERE id = ?",
    args: [nama, alamat, telp, id],
  });
};

export const deletePemilik = async (id) => {
  return await db.execute({
    sql: "DELETE FROM pemilik WHERE id = ?",
    args: [id],
  });
};
