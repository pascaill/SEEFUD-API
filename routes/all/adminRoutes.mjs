import express from "express";
import {
  getCounts,
  getVendors,
  getFeedback,
  deleteVendor,
  updateVendorRating,
} from "../../controllers/adminController.mjs";

import {
  authenticateToken,
  authorizeAdmin,
} from "../../middleware/authMiddleware.mjs";

import { validateVendorId } from "../../middleware/validateVendorId.mjs";

const router = express.Router();

// Routes accessible only by admin
router.get("/counts", authenticateToken, getCounts);

router.get(
  "/vendors",
  authenticateToken,
  authorizeAdmin,
  validateVendorId,
  getVendors
);
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

// tugas mbak ria
// update report status
// exampel 0  > 1
// ini udah di cover sama routes feedback

export default router;
