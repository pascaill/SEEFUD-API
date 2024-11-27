import express from "express";
import {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  upload,
} from "../../controllers/feedbackController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.post(
  "/:id",
  authenticateToken,
  upload.single("foto"), // Middleware untuk upload foto
  createFeedback
);

router.get("/:id", authenticateToken, getFeedback);

router.patch("/:id", authenticateToken, upload.single("foto"), updateFeedback);

router.delete("/:id", authenticateToken, deleteFeedback);

export default router;
