import db from "../config/database.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const result = await db.execute("SELECT id, name, email FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute({
      sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      args: [name, email, hashedPassword],
    });
    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
