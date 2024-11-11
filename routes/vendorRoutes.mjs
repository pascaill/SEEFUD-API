import express from "express";

import {
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
} from "../controllers/vendorController.mjs";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

const mustRole = "vendor";

router.get(
  "/vendor/dashboard",
  authenticateToken,
  authorizeRole(mustRole),
  (req, res) => {
    res.status(200).json({ message: "Welcome to UMKM dashboard" });
  }
);

// bisa di sesuaikan untuk hak akses role nya
router.post("/vendor", authenticateToken, createVendor);
router.get("/vendor/:id", authenticateToken, getVendor);
router.put("/vendor/:id", authenticateToken, updateVendor);
router.delete("/vendor/:id", authenticateToken, deleteVendor);

export default router;
