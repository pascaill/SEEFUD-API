import express from "express";
import {
  getAllVendor,
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
  upload,
} from "../../controllers/vendorController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";
import { isVendor, isVendorOrAdmin } from "../../middleware/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/", getAllVendor); // Admin/Vendor
router.post(
  "/",
  authenticateToken,
  isVendor,
  upload.single("image"),
  createVendor
); // Vendor only
router.get("/:id", authenticateToken, isVendorOrAdmin, getVendor); // Admin/Vendor
router.patch(
  "/:id",
  authenticateToken,
  isVendorOrAdmin,
  upload.single("image"),
  updateVendor
); // Admin/Vendor
router.delete("/:id", authenticateToken, isVendorOrAdmin, deleteVendor); // Admin/Vendor

export default router;
