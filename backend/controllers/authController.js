import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi" });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    let hashedPasswordFromDB = "";

    if (user.password instanceof Uint8Array || Buffer.isBuffer(user.password)) {
      hashedPasswordFromDB = Buffer.from(user.password).toString();
    } else {
      hashedPasswordFromDB = String(user.password);
    }

    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "UAS_PETDAYCARE_SECRET",
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("DEBUG LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
