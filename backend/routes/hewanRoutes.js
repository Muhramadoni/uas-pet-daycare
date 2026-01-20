import express from "express";
import {
  getHewan,
  addHewan,
  updateHewan,
  deleteHewan,
} from "../controllers/hewanController.js";

const router = express.Router();
router.get("/", getHewan);
router.post("/", addHewan);
router.put("/:id", updateHewan);
router.delete("/:id", deleteHewan);

export default router;
