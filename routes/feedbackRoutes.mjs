import express from "express";

import {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  upload,
} from "../controllers/feedbackController.mjs";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

const mustRole = "customer";

router.post(
  "/feedback",
  authenticateToken,
  upload.single("foto"),
  authorizeRole(mustRole),
  createFeedback
);

router.get("/feedback/:id", getFeedback);

router.put(
  "/feedback/:id",
  authenticateToken,
  upload.single("foto"),
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
