import express from "express";

import {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/vendorController.mjs";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

const mustRole = "customer";

// bisa di sesuaikan untuk hak akses role nya

router.post(
  "/feedback",
  authenticateToken,
  authorizeRole(mustRole),
  createFeedback
);
router.get("/feedback/:id", authenticateToken, getFeedback);
router.put(
  "/feedback/:id",
  authenticateToken,
  authorizeRole(mustRole),
  updateFeedback
);
router.delete(
  "/feedback/:id",
  authenticateToken,
  authorizeRole(mustRole),
  deleteFeedback
);

export default router;
