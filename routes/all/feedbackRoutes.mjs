import express from "express";
import {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  upload,
<<<<<<< HEAD:routes/feedbackRoutes.mjs
} from "../controllers/feedbackController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";
=======
} from "../../controllers/feedbackController.mjs";

import {
  authenticateToken,
  authorizeRole,
} from "../../middleware/authMiddleware.mjs";
>>>>>>> aec1e0bcfd73b038b0bf61f8a659fd10040a8815:routes/all/feedbackRoutes.mjs

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
