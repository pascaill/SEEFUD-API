import express from "express";
import {
  getAllVendor,
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
} from "../../controllers/vendorController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";
import { isVendor, isVendorOrAdmin } from "../../middleware/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/vendor", getAllVendor); // Admin/Vendor
router.post("/vendor", authenticateToken, isVendor, createVendor); // Vendor only
router.get("/vendor/:id", authenticateToken, isVendorOrAdmin, getVendor); // Admin/Vendor
router.patch("/vendor/:id", authenticateToken, isVendorOrAdmin, updateVendor); // Admin/Vendor
router.delete("/vendor/:id", authenticateToken, isVendorOrAdmin, deleteVendor); // Admin/Vendor

export default router;
