import express from "express";
import { getAllUsers, deleteUser } from "../../controllers/adminController.mjs";
import {
  authenticateToken,
  authorizeRole,
} from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", authenticateToken, authorizeRole("admin"), getAllUsers);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteUser);

export default router;
