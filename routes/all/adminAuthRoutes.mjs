import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../../controllers/adminAuthController.mjs";

const router = express.Router();

// Admin authentication routes
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/logoutAdmin", logoutAdmin);

export default router;
