import express from "express";

import {
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
  getAllVendor,
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
router.post(
  "/vendor",
  authenticateToken,
  authorizeRole(mustRole),
  createVendor
);

router.get("/vendor", getAllVendor);
router.get("/vendor/:id", getVendor);

router.put(
  "/vendor/:id",
  authenticateToken,
  authorizeRole(mustRole),
  updateVendor
);

router.delete(
  "/vendor/:id",
  authenticateToken,
  authorizeRole(mustRole, "admin"),
  deleteVendor
);

export default router;
