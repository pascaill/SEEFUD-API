import express from "express";
import { registerAdmin, loginAdmin, logoutAdmin } from "../controllers/adminAuthControllers.mjs";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Admin Login
router.post("/login", loginAdmin);

// Register a new admin (only accessible by existing admin)
router.post(
  "/register",
  authenticateToken,
  authorizeRole("admin"),
  registerAdmin
);
router.post("/logut",
    authenticateToken,
    authorizeRole("admin"), 
    logoutAdmin);

export default router;
