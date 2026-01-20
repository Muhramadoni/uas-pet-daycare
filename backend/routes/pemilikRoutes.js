import express from "express";
import {
  getPemilik,
  addPemilik,
  updatePemilik,
  deletePemilik,
} from "../controllers/pemilikController.js";

const router = express.Router();

router.get("/", getPemilik);
router.post("/", addPemilik);
router.put("/:id", updatePemilik);
router.delete("/:id", deletePemilik);

export default router;
