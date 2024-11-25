import express from "express";
import {
  getCounts,
  getVendors,
  getFeedback,
  deleteVendor,
  updateVendorRating,
} from "../controllers/adminController.mjs"; 
import { validateVendorId } from "../middleware/authMiddleware.mjs";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Routes accessible only by admin
router.get("/counts", authenticateToken, authorizeAdmin, getCounts);
router.get("/vendors", authenticateToken, authorizeAdmin, getVendors);
router.get(
  "/vendors/:vendorId/feedback",
  authenticateToken,
  authorizeAdmin,
  validateVendorId,
  getFeedback
);
router.delete(
  "/vendors/:vendorId",
  authenticateToken,
  authorizeAdmin,
  validateVendorId,
  deleteVendor
);
router.patch(
  "/vendors/:vendorId/rating",
  authenticateToken,
  authorizeAdmin,
  validateVendorId,
  updateVendorRating
);

export default router;
