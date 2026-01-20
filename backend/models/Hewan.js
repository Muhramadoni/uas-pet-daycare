import db from "../config/database.js";

export const getAllHewanWithPemilik = async () => {
  const result = await db.execute(`
    SELECT hewan.*, pemilik.nama_pemilik 
    FROM hewan 
    JOIN pemilik ON hewan.pemilik_id = pemilik.id
  `);
  return result.rows;
};

export const createHewan = async (nama_hewan, jenis_hewan, pemilik_id) => {
  return await db.execute({
    sql: "INSERT INTO hewan (nama_hewan, jenis_hewan, pemilik_id) VALUES (?, ?, ?)",
    args: [nama_hewan, jenis_hewan, pemilik_id],
  });
};

export const updateHewan = async (id, nama_hewan, jenis_hewan, pemilik_id) => {
  return await db.execute({
    sql: "UPDATE hewan SET nama_hewan = ?, jenis_hewan = ?, pemilik_id = ? WHERE id = ?",
    args: [nama_hewan, jenis_hewan, pemilik_id, id],
  });
};

export const deleteHewan = async (id) => {
  return await db.execute({
    sql: "DELETE FROM hewan WHERE id = ?",
    args: [id],
  });
};
