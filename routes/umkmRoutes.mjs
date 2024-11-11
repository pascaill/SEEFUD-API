import express from "express";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get(
  "/umkm-dashboard",
  authenticateToken,
  authorizeRole("vendor"),
  (req, res) => {
    res.status(200).json({ message: "Welcome to UMKM dashboard" });
  }
);

export default router;
