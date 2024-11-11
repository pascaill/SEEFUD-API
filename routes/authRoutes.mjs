import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  deleteAccount,
} from "../controllers/authController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", authenticateToken, updateProfile);
router.delete("/profile", authenticateToken, deleteAccount);

export default router;
