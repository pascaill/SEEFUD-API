import express from "express";
import {
  registerUserVendor,
  loginUserVendor,
  logoutUserVendor,
  updateProfileUserVendor,
  deleteAccountUserVendor,
} from "../../controllers/authController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/register", registerUserVendor);
router.post("/login", loginUserVendor);
router.post("/logout", logoutUserVendor);
router.put("/profile", authenticateToken, updateProfileUserVendor);
router.delete("/profile", authenticateToken, deleteAccountUserVendor);

export default router;
