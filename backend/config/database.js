import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.TURSO_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("ERROR: Cek file .env! URL atau Token kosong.");
} else {
  console.log("Database Config Loaded");
}

const db = createClient({
  url: url || "",
  authToken: authToken || "",
});

export default db;
