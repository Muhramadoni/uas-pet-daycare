import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import hewanRoutes from "./routes/hewanRoutes.js";
import pemilikRoutes from "./routes/pemilikRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hewan", hewanRoutes);
app.use("/api/pemilik", pemilikRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});
