import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import hewanRoutes from "./routes/hewanRoutes.js";
import pemilikRoutes from "./routes/pemilikRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://uas-pet-daycare-rwie.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Pet Daycare API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/hewan", hewanRoutes);
app.use("/api/pemilik", pemilikRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
