import express from "express";
import {
  getAllUsers,
  deleteUser,
  getUserById,
} from "../../controllers/adminController.mjs";
import {
  authenticateToken,
  authorizeRole,
} from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", authenticateToken, authorizeRole("admin"), getAllUsers);
router.get("/:id", authenticateToken, authorizeRole("admin"), getUserById);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteUser);

export default router;
