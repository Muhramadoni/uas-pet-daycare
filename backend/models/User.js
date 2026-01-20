import db from "../config/database.js";

export const User = {
  findByEmail: async (email) => {
    try {
      const res = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [email],
      });
      return res.rows[0];
    } catch (error) {
      console.error("Masalah Query:", error.message);
      throw error;
    }
  },
};
