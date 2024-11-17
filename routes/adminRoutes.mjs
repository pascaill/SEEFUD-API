import express from "express";
import {
  getCounts,
  getVendors,
  getFeedback,
  deleteVendor,
  updateVendorRating,
} from "../controllers/adminControllers.mjs";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Only admin can access these routes
router.get("/counts", authenticateToken, authorizeRole("admin"), getCounts);
router.get("/vendors", authenticateToken, authorizeRole("admin"), getVendors);
router.get("/vendors/:vendorId/feedback", authenticateToken, authorizeRole("admin"), getFeedback);
router.delete("/vendor/:vendorId", authenticateToken, authorizeRole("admin"), deleteVendor);
router.put("/vendor/:vendorId/rating", authenticateToken, authorizeRole("admin"), updateVendorRating);

export default router;
