import express from "express";
import {
  getAllVendor,
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
<<<<<<< HEAD:routes/vendorRoutes.mjs
} from "../controllers/vendorController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";
import { isVendor, isVendorOrAdmin } from "../middleware/roleMiddleware.mjs";
=======
  getAllVendor,
} from "../../controllers/vendorController.mjs";

import {
  authenticateToken,
  authorizeRole,
} from "../../middleware/authMiddleware.mjs";
>>>>>>> aec1e0bcfd73b038b0bf61f8a659fd10040a8815:routes/all/vendorRoutes.mjs

const router = express.Router();

// Routes
router.get("/", getAllVendor); // Admin/Vendor
router.post("/", authenticateToken, isVendor, createVendor); // Vendor only
router.get("/:id", authenticateToken, isVendorOrAdmin, getVendor); // Admin/Vendor
router.patch("/:id", authenticateToken, isVendorOrAdmin, updateVendor); // Admin/Vendor
router.delete("/:id", authenticateToken, isVendorOrAdmin, deleteVendor); // Admin/Vendor

export default router;
