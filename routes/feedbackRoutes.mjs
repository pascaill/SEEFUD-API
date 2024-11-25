import express from "express";
import {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  upload,
} from "../controllers/feedbackController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post(
  "/feedback/:vendorId",
  authenticateToken,
  upload.single("foto"), // Middleware untuk upload foto
  createFeedback
);

router.get("/feedback/:id", authenticateToken, getFeedback);

router.patch(
  "/feedback/:id",
  authenticateToken,
  upload.single("foto"),
  updateFeedback
);

router.delete("/feedback/:id", authenticateToken, deleteFeedback);

export default router;
